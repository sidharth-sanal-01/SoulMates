export const LoginStart = (userCredentials) => ({
    type: "LOGIN_START",
  });
  
  export const LoginSuccess = (user) => ({
    type: "LOGIN_SUCCESS",
    payload: user,
  });
  
  export const LoginFailure = () => ({
    type: "LOGIN_FAILURE",
  })

  export const follow = (userId) => ({
    type: "FOLLOW",
    payload:userId
  })

  
  export const unfollow = (userId) => ({
    type: "UNFOLLOW",
    payload:userId
  })
  
  export const editUser = (userDetails) => ({
    type: "EDIT_USER",
    payload:userDetails
  })

  
  export const updateProfilePic = (userProfilePic) => ({
    type: "UPDATE_PROFILE_PIC",
    payload:userProfilePic
  })

  
  export const updateProfilePic = (userCoverPic) => ({
    type: "UPDATE_COVER_PIC",
    payload:userCoverPic
  })

  
  export const logout = (logout) => ({
    type: "LOGOUT"
  })