export const handleNotCorrectSource = (player) =>  
    ({
        type: "notCorrectSource",
        payload: "Wrong selection. Choose player " + player + " pieces."
    })