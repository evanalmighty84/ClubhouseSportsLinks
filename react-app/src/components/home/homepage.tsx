import React, {useEffect, useState} from 'react';
import Hero from './Hero';





const HomePage = () => {
    const [isUserAuthenticated, setIsUserAuthenticated] = useState(false)
    const [isFetching, setIsFetching] = useState(false)  // set to true if you add authentication
    const [userDetails, setUserDetails] = useState({
        firstName: '',
        lastName: '',
        mailid: '',
        timeZone: '',
        createdTime: ''
    });

/*    useEffect(() => {
        //@ts-ignore
        window.catalyst.auth.isUserAuthenticated().then((result: { content: { first_name: any; last_name: any; email_id: any; time_zone: any; created_time: any; }; }) => {
            setIsUserAuthenticated(true)
            console.log(result)
            let userDetails = {
                firstName: result.content.first_name,
                lastName: result.content.last_name,
                mailid: result.content.email_id,
                timeZone: result.content.time_zone,
                createdTime: result.content.created_time
            }
            setUserDetails(userDetails)

        }).catch((err: any) => {

        }).finally(() => {
            setIsFetching(false)
        })
    }, [])*/


    return (
        <div className="homePage" style={{backgroundColor: 'white', color:'black'}}>

            <div>

                {
                    isFetching ? <p>Loading ....</p> : isUserAuthenticated ?
                        <div>''</div> : <Hero/>
                }
            </div>
            {/*      <Hero />*/}
        </div>
    );
};

export default HomePage;