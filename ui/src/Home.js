import React from 'react'
import './App.css'
import { useEffect } from 'react';
import { Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';
export default function App() {
    useEffect(() => {

    }, {})
    const [state, setState] = React.useState({ userid: uuidv4(), startChat: false, allMessages: [], receiverId: "", roomNo: "", message: "", senderId: "", interest: "", userid2: "", interest2: "" })
    async function deleteRoom(event) {
        event.preventDefault();
        console.log(state.roomNo)
        await fetch('/deleteroom', {
            method: 'post',
            body: JSON.stringify(state),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            }
        })
            .then(async (res) => {

                if (res.status === 200) {
                    // setState({productUploaded: true,
                    //     serial: ""                        
                    // })
                    let response_body = await res.json();
                    console.log(response_body, "4")

                    setState({ startChat: false })
                } else {
                    const error = new Error(res.error);
                    throw error;
                }
            })
            .catch(err => {
                console.error(err);
                alert('Error deleting the room, please try again');
            });

    }
    async function sendMessage(event) {
        event.preventDefault();
        console.log(state)
        
        await fetch('/insertmessage', {
            method: 'post',
            body: JSON.stringify(state),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            }
        })
            .then(async (res) => {

                if (res.status === 200) {
                    // setState({productUploaded: true,
                    //     serial: ""                        
                    // })
                    setState({ ...state, message: "" })

                    let response_body = await res.json();
                    // let roomNo=await response_body.roomNo
                    console.log(response_body, "5")

                    await fetch('/getmessages', {
                        method: 'post',
                        body: JSON.stringify(state),
                        headers: {
                            'Accept': 'application/json, text/plain, */*',
                            'Content-Type': 'application/json',
                        }
                    })
                        .then(async (res) => {

                            if (res.status === 200) {
                                setState({ ...state, message: "" })
                                let response_body = await res.json();
                                let allMessages = await response_body.results
                                console.log(allMessages, "6")

                                setState({ ...state, allMessages })
                            } else {
                                const error = new Error(res.error);
                                throw error;
                            }
                        })
                        .catch(err => {
                            console.error(err);
                            alert('Error getting messages, please try again');
                        });

                } else {
                    const error = new Error(res.error);
                    throw error;
                }
            })
            .catch(err => {
                console.error(err);
                alert('Error sending message, please try again');
            });
    }
    async function addInQueue(event) {
        event.preventDefault();
       async function searchUser() {
            await fetch('/searchforpartner', {
                method: 'post',
                body: JSON.stringify(state),
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                }
            })
                .then(async (res) => {

                    if (res.status === 200) {
                        // setState({productUploaded: true,
                        //     serial: ""                        
                        // })
                        
                        let response_body = await res.json();
                        console.log(res.results)
                        let userid2 = await response_body.results[0].userid
                        console.log(userid2, "talhakatest")
                        setState({ ...state, userid2: response_body.results[0].userid, interest2: response_body.results[0].interest })
                        console.log(response_body.results[0].userid, "3")
                        
                        let room = {
                            userid1: state.userid.slice(0, 5),
                            userid2: userid2.slice(0, 5)
                        }
                        await fetch('/createroom', {
                            method: 'post',
                            body: JSON.stringify(room),
                            headers: {
                                'Accept': 'application/json, text/plain, */*',
                                'Content-Type': 'application/json',
                            }
                        })
                            .then(async (res) => {

                                if (res.status === 200) {
                                    // setState({productUploaded: true,
                                    //     serial: ""                        
                                    // })
                                    let response_body = await res.json();
                                    let roomNo = await response_body.roomNo
                                    console.log(response_body.roomNo, "4")
                                    setState({ ...state, senderId: state.userid, receiverId: userid2, startChat: true, roomNo })
                                    await fetch('/deletefromqueue', {
                                        method: 'post',
                                        body: JSON.stringify(state),
                                        headers: {
                                            'Accept': 'application/json, text/plain, */*',
                                            'Content-Type': 'application/json',
                                        }
                                    })
                                        .then(async (res) => {

                                            if (res.status === 200) {
                                                // setState({productUploaded: true,
                                                //     serial: ""                        
                                                // })
                                                let response_body = await res.json();

                                                console.log(response_body, "last")
                                            } else {
                                                const error = new Error(res.error);
                                                throw error;
                                            }
                                        })
                                        .catch(err => {
                                            console.error(err);
                                            alert('Error removing from queue, please try again');
                                        });
                                } else {
                                    const error = new Error(res.error);
                                    throw error;
                                }
                            })
                            .catch(err => {
                                console.error(err);
                                alert('Error creating room, please try again');
                            });
                        
                    }
                    
                    else if(res.status==400){
alert("No Users found,please try again")
                    }
                    else {
                        const error = new Error(res.error);
                        throw error;
                    }
                })
                .catch(err => {
                    console.error(err);
                    alert('Error searching for partner, please try again');
                });

        }
        setState({ ...state, userid: uuidv4() },)
        console.log(state)
        await fetch('/insertinqueue', {
            method: 'post',
            body: JSON.stringify(state),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            }
        })
            .then(async (res) => {
                if (res.status === 200) {
                    
                    console.log(res.json(), "1")
                    await fetch('/searchforpartner', {
                        method: 'post',
                        body: JSON.stringify(state),
                        headers: {
                            'Accept': 'application/json, text/plain, */*',
                            'Content-Type': 'application/json',
                        }
                    })
                        .then(async (res) => {

                            if (res.status === 200) {
                                // setState({productUploaded: true,
                                //     serial: ""                        
                                // })
                                
                                let response_body = await res.json();
                                console.log(res.results)
                                let userid2 = await response_body.results[0].userid
                                console.log(userid2, "talhakatest")
                                setState({ ...state, userid2: response_body.results[0].userid, interest2: response_body.results[0].interest })
                                console.log(response_body.results[0].userid, "3")
                                
                                let room = {
                                    userid1: state.userid.slice(0, 5),
                                    userid2: userid2.slice(0, 5)
                                }
                                await fetch('/createroom', {
                                    method: 'post',
                                    body: JSON.stringify(room),
                                    headers: {
                                        'Accept': 'application/json, text/plain, */*',
                                        'Content-Type': 'application/json',
                                    }
                                })
                                    .then(async (res) => {

                                        if (res.status === 200) {
                                            // setState({productUploaded: true,
                                            //     serial: ""                        
                                            // })
                                            let response_body = await res.json();
                                            let roomNo = await response_body.roomNo
                                            console.log(response_body.roomNo, "4")
                                            setState({ ...state, senderId: state.userid, receiverId: userid2, startChat: true, roomNo })
                                            await fetch('/deletefromqueue', {
                                                method: 'post',
                                                body: JSON.stringify(state),
                                                headers: {
                                                    'Accept': 'application/json, text/plain, */*',
                                                    'Content-Type': 'application/json',
                                                }
                                            })
                                                .then(async (res) => {

                                                    if (res.status === 200) {
                                                        // setState({productUploaded: true,
                                                        //     serial: ""                        
                                                        // })
                                                        let response_body = await res.json();

                                                        console.log(response_body, "last")
                                                    } else {
                                                        const error = new Error(res.error);
                                                        throw error;
                                                    }
                                                })
                                                .catch(err => {
                                                    console.error(err);
                                                    alert('Error removing from queue, please try again');
                                                });
                                        } else {
                                            const error = new Error(res.error);
                                            throw error;
                                        }
                                    })
                                    .catch(err => {
                                        console.error(err);
                                        alert('Error creating room, please try again');
                                    });
                                
                            }
                            
                            else if(res.status==400){
                                setTimeout(() => {
                                    searchUser()
                                }, 30000);

                            }
                            else {
                                const error = new Error(res.error);
                                throw error;
                            }
                        })
                        .catch(err => {
                            console.error(err);
                            alert('Error searching for partner, please try again');
                        });

                } else {
                    const error = new Error(res.error);
                    throw error;
                }
            })
            .catch(err => {
                console.error(err);
                alert('Error adding in queue, please try again');
            });
    }
    function handleInputChange(event) {
        const { value, name } = event.target;
        setState({
            ...state,
            [name]: value
        });
    }
    return (
        <div>
            {!state.startChat &&
                <div>
                    <nav class="navbar navbar-light bg-light" style={{ backgroundColor: "#f8f9fa", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: "10px 20px" }}>
                        <a class="navbar-brand" href="#">
                            <img src="/docs/4.5/assets/brand/bootstrap-solid.svg" width="30" height="30" class="d-inline-block align-top" alt="" loading="lazy" />
                            <p id="tit">Omegle Clone</p>
                        </a>
                        <div>
                            <p id="tagLine">Talk With Strangers!</p>
                        </div>
                    </nav>

                    <div class="container">
                        <center><p style={{ width: "80%" }}>Omegle (oh·meg·ull) is a great way to meet new friends, even while practicing social distancing. When you use Omegle, we pick someone else at random and let you talk one-on-one. To help you stay safe, chats are anonymous unless you tell someone who you are (not suggested!), and you can stop a chat at any time. Predators have been known to use Omegle, so please be careful. If you prefer, you can add your interests, and Omegle will look for someone who's into some of the same things as you instead of someone completely random.</p></center>
                    </div>
                    <br />
                    <center><h2>What Do you wanna chat about?</h2>
                        <label id="interest" for="cars">Choose Interests:</label>
                        <div class="divider"></div>
                        <br />
                        <select
                            name="interest"
                            id="interest"
                            value={state.interest}
                            onChange={handleInputChange}
                            multiple
                        >
                            <option value="cars">Cars</option>
                            <option value="dating">Dating</option>
                            <option value="funny">Fuwwy O~O</option>
                            <option value="movies">Movies</option>
                            <option value="programming">Programming</option>
                            <option value="comedy">Comedy</option>
                            <option value="nature">Nature</option>
                            <option value="sFiction">Science Fiction</option>
                            <option value="music">Music</option>
                        </select>
                        <div class="buttonDiv" style={{ display: "block", marginTop: "20px" }}>
                            {/* <Link to="/chat" class="testbutton" >Find Stranger</Link> */}
                            <button onClick={addInQueue} class="testbutton">Find Stranger</button>
                        </div>
                    </center>
                </div>
            }
            {state.startChat &&
                <div>
                    <h2>Chat Down Here!</h2>
                    <div class="chatbox flex-container">
                        <span style={{ display: "flex", justifyContent: "space-between", padding: "0px 20px", backgroundColor: "white", color: "black" }}>
                            <h3>Anonymous</h3>
                            <button onClick={deleteRoom} className="deleteButtonChat" style={{ backgroundColor: "red", padding: "0px 20px", margin: "5px", color: "black" }}>X</button>
                        </span>
                        {state.allMessages.map(item => {
                            return (
                                <>
                                    {item.receiverId == state.receiverId &&
                                        <>
                                            <div class="stranger">
                                                <p class="strangerp">{item.message}</p>
                                                {/* <p class="strangerp strangert">11:00</p> */}
                                            </div>
                                            <div class="chatDivider"></div>
                                        </>
                                    }
                                    {item.senderId == state.senderId &&
                                        <>
                                            <div class="you">
                                                <p class="youc">{item.message}</p>
                                                {/* <p class="youc yout">11:00</p> */}
                                            </div>
                                            <div class="chatDivider"></div>
                                        </>}
                                </>
                            )
                        })}
                    </div>

                    <div class="divider"></div>
                    <div class="formDiv">
                        <form>
                            <input id="textinput" type="text" name="message" size="80"
                                value={state.message}
                                autocomplete="off"
                                onChange={handleInputChange}
                            />
                        </form>
                    </div>

                    <div class="buttonDiv">
                        <button type="button" class="testbutton" onClick={sendMessage}>Send</button>
                    </div>
                </div>}

        </div>
    )
}
