export const handleNotCorrectSource = (isSourceSelectionNotCorrect, player, i) =>  
    {
        if (isSourceSelectionNotCorrect) {
        return {
            type: "notCorrectSource",
            payload: "Wrong selection. Choose player " + player + " pieces."
        }
    }
    else {
        return {
            type: "notCorrectSource",
            payload:  "Choose destination for the selected piece"
        }
    }
    }
        
    
    