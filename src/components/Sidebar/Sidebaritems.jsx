import React from 'react'
import CreatePost from './CreatePost'
import Home from './Home'
import Notifications from './Notifications'
import ProfileLink from './ProfileLink'
import Search from './Search'


function SidebarItems() {


return (
    <>
        <Home />
        <Search />
        <Notifications />
        <CreatePost />
        <ProfileLink />
    </>
)


}

export default SidebarItems