const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,
        error: false,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        isFetching: false,
        error: true,
      };
    case "FOLLOW":
      return {
        ...state,
        user: {
          ...state.user,
          following: [...state.user.following, action.payload.userId],
        },
      };
    case "UNFOLLOW":
      return {
        ...state,
        user: {
          ...state.user,
          following: state.user.following.filter(
            (followerId) => followerId !== action.payload.userId
          ),
        },
      };
    case "EDIT_USER":
      return {
        ...state,
        user: {
          ...state.user,
          age: action.payload.age,
          homeTown: action.payload.homeTown,
          RelationshipStatus: action.payload.RelationshipStatus,
          job: action.payload.job,
        },
      };
    case "UPDATE_PROFILE_PIC":
      return {
        ...state,
        user: {
          ...state.user,
          profilePic: action.payload.profilePic,
        },
      };
      case "UPDATE_COVER_PIC":
      return {
        ...state,
        user: {
          ...state.user,
          coverPic: action.payload.coverPic,
        },
      };
      case "LOGOUT":
     
        localStorage.clear();
    
    default: {
      return state;
    }
  }
};

export default AuthReducer;
