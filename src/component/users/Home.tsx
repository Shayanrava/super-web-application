import { Alert } from "@mui/material";
import Typography from '@mui/material/Typography'
import List from "./List";
import { useEffect, useState } from "react";
import Add from "./Add";
import axios, { AxiosResponse } from "axios";

export interface People {
    name: string,
    nationality: string,
    age: string,
    url?: string,
    id: number
};




export default function Home() {

    useEffect(() => {
        getUsers()
    }, [])

    const [id, setID] = useState<number>(2)
    const [people, setPeople] = useState<People[]>([])

    const getUsers = async (): Promise<void> => {
        const res: AxiosResponse<any, any, {}> = await axios.get("http://localhost:12793/users")
        setPeople(res.data)
        people.length
    }
    return (
        people.length > 0 ? (
            < div className='bg-gray-400  h-full' >
                <div className='w-full flex flex-col items-center '>
                    <Alert icon={false} className='w-5/6  flex flex-row justify-center my-20 bg-[rgb(237, 247, 237)] md:w-3/4 lg:w-2/3' >
                        <Typography variant="h4" color="info" >
                            manage People
                        </Typography>
                    </Alert>
                    <List setPeople={setPeople} people={people}></List>
                    <Add ID={id} people={people} setPeople={setPeople} setID={setID}></Add>

                </div>
            </div >
        ) : ""

    )

}



