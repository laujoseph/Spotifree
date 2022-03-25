import React, {useState} from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root')
const UserProfile = ({userInfo}) => {
    const date = new Date();
    const hour = date.getHours();
    const [modalopen, setModalOpen] = useState(false);
    return (
        <>
        {/* <pre>{JSON.stringify(userInfo)}</pre> */}
        {userInfo ? 
        <div className="userprofile">
            <img 
            onClick={()=>{setModalOpen(true)}} 
            className="profilepic" 
            src={userInfo.images[0].url} 
            alt="profile pic"
            />
            <div className="greetingtext">{hour>=12 ? hour>=16 ? <h2>Good Evening, {userInfo.display_name}</h2> : <h2>Good Afternoon, {userInfo.display_name}</h2> : <h2>Good Morning, {userInfo.display_name}</h2>}</div>
            <Modal 
            isOpen={modalopen} 
            onRequestClose={()=>setModalOpen(false)}
            style={
                {
                    overlay: {
                        backgroundColor: 'rgba(255,255,255,0)'
                    },
                    
                    content: {
                        height: '440px',
                        width: '350px',
                        margin: 'auto',
                        marginLeft: '125px'
                    }
                }
            }
            >
            <img className="modalprofilepic" src={userInfo.images[0].url} alt="profile pic"/>
            <div className="textwrapper">
            <h1>{userInfo.display_name}</h1>
            <h3>{userInfo.country}</h3>
            <h3>Followers: {userInfo.followers.total}</h3>
            <h3>{userInfo.email}</h3>
            <a className="profilelink" target="_blank" rel="noreferrer" href={userInfo.external_urls.spotify}>View on Spotify</a>
            <br></br><br></br><br></br>
            <button onClick={()=>{setModalOpen(false)}}>Back to player</button>
            </div>
            </Modal>
        </div> : ''}
        </>
    );
};

export default UserProfile;
