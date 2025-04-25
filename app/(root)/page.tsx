import React from 'react'
import {Button} from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {dummyInterviews} from "@/constants";
import InterviewCards from "@/components/InterviewCards";
import {getCurrentUser, getInterviewsByUserId} from "@/lib/actions/auth.action";
//this is the home page
const Page = async () => {

    const user = await getCurrentUser();
    const userInterviews = await getInterviewsByUserId(user?.id!);

    const hasPastInterviews = userInterviews?.length > 0;

    return (
        <>
            <section className="card-cta">
                <div className="flex flex-col gap-6 max-w-lg">
                    <h2>Get Interview Ready with AI</h2>

                    <p className="text-lg">Practice on real interview questions and get instant score</p>


                    <Button asChild className="btn-primary max-sm:w-full">
                        <Link href="/interview">Start an Interview</Link>

                    </Button>
                </div>

                <Image src="/robot.png" alt="robo-dude" width={400} height={400} className="max-sm:hidden"></Image>
            </section>


            <section className="flex flex-col gap-6 mt-8">
                <h2>Your Interviews</h2>

                <div className="interviews-section">
                    {hasPastInterviews ? (
                        userInterviews?.map((interview)=>(
                            <InterviewCards {... interview} key={interview.id} />
                        ))): (
                            <p>You haven&#39;t taken any interviews</p>
                    )
                    }
                </div>
            </section>

            <section className="flex flex-col gap-6 mt-8">
                <h2>Take an Interview</h2>

                <div className="interviews-section">
                    {dummyInterviews.map((interview)=>(
                        <InterviewCards {... interview} key={interview.id} />
                    ))}
                </div>

            </section>


        </>
    )
}
export default Page
