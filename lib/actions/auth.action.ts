'use server'

import {db, auth} from "@/firebase/admin";
import {cookies} from "next/headers";


const ONE_WEEK = 60*60*24*7

//signup
export async function signUp(params: SignUpParams){
    //logic for checking if user already exits or not 
    
    const {uid, name, email} = params;
    
    try {
        //checking from userRecords
        const userRecords = await db.collection('users').doc(uid).get();

        if(userRecords.exists){
            return{
                success: false,
                message: "User already exists, Please sign in instead"
            }
        }

        //creating a new user if not exists
        await db.collection('users').doc(uid).set({
            name, email
        })

        return {
            success: true,
            message: 'Account created successfully, Please Sign in.'
        }

    }
    catch(e:any) {
        console.error('Error in creating a user', e);
        
        //checking for different errors and then displaying the same
        if(e.code === 'auth/email-already-exists'){
            return {
                success:false,
                message:"Email already exists, try other email"
            }
        }
        else{
            return{
                success:false,
                message: "can't create an account"
            }
        }
        
    }
}

//signin
export async function signIn(params: SignInParams){
    const {email, idToken} = params;


    try{
        const userRecord = await auth.getUserByEmail(email);

        if(!userRecord){
            return{
                success:false,
                message: "User does not exist, Create an account"
            }
        }

        await setSessionCookie(idToken)
    } catch(e){
        console.log(e)

        return {
            success:false,
            message: "failed to log in into account"
        }
    }

}

//cookies
export async function setSessionCookie(idToken: string){
    const cookieStore = await cookies();

    const sessionCookie = await auth.createSessionCookie(idToken,{
        expiresIn: ONE_WEEK * 1000,
    })


    cookieStore.set('session', sessionCookie, {
        maxAge: ONE_WEEK,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax'
    })
}



//getting authenticated user
export async function getCurrentUser(): Promise<User | null>{

    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session')?.value;
    if(!sessionCookie) return null

    try{
        const decodedClaims = await auth.verifySessionCookie(sessionCookie, true)

        const userRecord = await db.
            collection('users').doc(decodedClaims.uid).get()


        if(!userRecord.exists) return null;


        const userData = userRecord.data();
        const userDataName = userData?.name;

        return{
            id: userRecord.id,
            name: userDataName,
            ...userData,
        } as User

    }catch (e) {
        console.error('error in getCurrentUser', e);

        return null;
    }
}


export async function isAuthenticated(){
    const user = await getCurrentUser();

    return !!user;
}


//function to fetch all interviews related to a user

export async function getInterviewsByUserId(userId: string): Promise<Interview[]>{

    const interviews = await db
        .collection('interviews')
        .where('userId', '==', userId)
        .orderBy('createdAt', 'desc')
        .get();

    return interviews.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    })) as Interview[];
}



