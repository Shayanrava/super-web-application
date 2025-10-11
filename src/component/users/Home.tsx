import { Alert } from "@mui/material";
import Typography from '@mui/material/Typography'
import List from "./List";
import { useState } from "react";
import Add from "./Add";

export interface People {
    name: string,
    nationality: string,
    age: string,
    url?: string,
    id: number
};




export default function Home() {

    const [id , setID]= useState<number>(2)
    const [people, setPeople] = useState<People[]>([
        { name: "Ahmed Martush", id: 0, nationality: "Turkey", age: "27" },
        { name: "Edmilson Junior", id: 1, nationality: "Brazil", age: "31", url: "https://www.nasa.gov/wp-content/uploads/2023/03/iss065e049854-1.jpg" },
        { name: "Masata Delafuente", id: 2, nationality: "Mexico", age: "25" },

    ])
    return (


        <div className='bg-gray-400  h-full'>
            <div className='w-full flex flex-col items-center '>
                <Alert icon={false} className='w-2/3 flex flex-row justify-center my-20 bg-[rgb(237, 247, 237)]' >
                    <Typography variant="h4" color="info" >
                        manage People
                    </Typography>
                </Alert>
                <List setPeople={setPeople} people={people}></List>
                <Add  ID={id} people={people} setPeople={setPeople}  setID={setID}></Add>

            </div>
        </div>
    )

}
         


