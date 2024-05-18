import React from 'react'
import icAva from "../../assets/btnProfile.svg"
import icFriendMore from "../../assets/iconFriendMore.svg"

const FriendPageItem = ({ name }) => {
  return (
    <div className=' height-sm d-flex align-items-center border-bottom'>
        <div className='col-1'>
            <img src={icAva} />
        </div>
        <div className='col-10 fw-bold'>
            {name}
        </div>
        <div className='col-1 cursor-pointer'>
            <img src={icFriendMore} />
        </div>
    </div>
  )
}

export default FriendPageItem