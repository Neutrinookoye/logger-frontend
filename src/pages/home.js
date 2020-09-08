import React, {useEffect} from 'react'

import {Users, Folder, DollarSign, Award, File} from 'react-feather'

import accountController from '../server/controller'; 

function Home() {

    useEffect(() => {
        document.body.classList.remove("login-page")
    })
    const user = accountController.userValue;

    return(
        <section className="homepage mt-4">
            <div className="container">
                <h4>Welcome {user.firstName}</h4>
                <p>Hope you are okay with your statistics report?</p>
                <div className="stats">
                    <div className="row">
                        <div className="col-lg-4 col-sm-6">
                            <div className="stat-box">
                                <p>
                                    <Users size={30} />
                                    <span className="pl-2">Friends</span>
                                </p>
                                <p className="total">--</p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6">
                            <div className="stat-box">
                                <p>
                                    <File size={30} />
                                    <span className="pl-2">Courses</span>
                                </p>
                                <p className="total">--</p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6">
                            <div className="stat-box">
                                <p>
                                    <Users size={30} />
                                    <span className="pl-2">Invitations</span>
                                </p>
                                <p className="total">--</p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6">
                            <div className="stat-box">
                                <p>
                                    <Folder size={30} />
                                    <span className="pl-2">Assignments</span>
                                </p>
                                <p className="total">--</p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6">
                            <div className="stat-box">
                                <p>
                                    <DollarSign size={30} />
                                    <span className="pl-2">Payments</span>
                                </p>
                                <p className="total">--</p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6">
                            <div className="stat-box">
                                <p>
                                    <Award size={30} />
                                    <span className="pl-2">Performance</span>
                                </p>
                                <p className="total">--</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
    )
}

export default Home