import  {Dispatch ,SetStateAction } from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'
import CardHeader from '@mui/material/CardHeader'
import Avatar from '@mui/material/Avatar'
import { People } from "./Home";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Edit from "./Edit";



interface Props {
  people: People[],
  setPeople: Dispatch<SetStateAction<People[]>>

}

export default function List({ people , setPeople }: Props) {

  const DeleteUser = (ID: number): void => {
       const filteredPeople = people.filter((p)=>p.id !== ID)
       setPeople(filteredPeople)
  }

  return (
    <div className="w-full flex">
      <Box className="w-full grid grid-cols-4 gap-4 mt-4 px-5">
        {people.map((person) => {
          return (
            <Card key={person.id} className="bg-blue-200 hover:shadow-[0px_0px_50px_20px_rgba(255,255,255,1)] rounded-lg hover:bg-blue-400 overflow-visible relative ">
              <CardHeader
                avatar={
                  <Avatar aria-label="" >
                    {
                      person.url ?
                        <img src={person.url} className=" object-cover w-full h-full" alt="" />
                        :
                        <Typography className="bg-black text-white w-full h-full flex items-center justify-center">{person.name[0].toUpperCase()}</Typography>
                    }
                  </Avatar>
                }
                title={
                  <Typography variant="h5" component="div">
                    {person.name}
                  </Typography>
                }
                subheader={
                  <Typography variant="body2" color="text.secondary">
                    {person.nationality}
                  </Typography>
                }

              />
              <CardContent sx={{ height: '100%' }} >
                <Typography variant="body2" className="bg-cyan-300 rounded-2xl inline-block px-3 py-1 absolute -top-3 -left-3 ">
                  {person.age} years
                </Typography>
                <Typography variant="h5" color="initial" className="text-center">
                  {person.id}
                </Typography>

                <Box className="my-3">
                  <Edit people={people} setPeople={setPeople} ID={person.id}></Edit>
                  <Button variant="contained" color="error" className="" onClick={() => DeleteUser(person.id)}>delete <DeleteForeverIcon className="mx-1"></DeleteForeverIcon> </Button>
                </Box>
              </CardContent>
            </Card>

          )
        })}

      </Box>
    </div>
  );
}