import React from 'react'
import FollowersCard from '../FollowersCard/FollowersCard'
import BioCard from '../BioCard/BioCard'
import LogoSearch from '../LogoSearch/LogoSearch'

const ProfileLeft = () => {
  return (
    <div className="ProfileSide">
        <LogoSearch/>
        <BioCard/>
        <FollowersCard/>
    </div>
  )
}

export default ProfileLeft