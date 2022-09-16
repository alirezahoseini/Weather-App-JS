class UserCity{
    checkLocalStorage(){
        const userCity = localStorage.getItem("userCity")
        return userCity
    }
}

export default UserCity