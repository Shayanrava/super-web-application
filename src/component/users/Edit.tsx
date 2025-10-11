import { SetStateAction, Dispatch, useState, FormEvent, useEffect } from 'react'
import Button from '@mui/material/Button'
import EditDocumentIcon from '@mui/icons-material/EditDocument';
import { People } from "./Home";
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';




interface Props {
    people: People[],
    setPeople: Dispatch<SetStateAction<People[]>>,
    ID: number

}

export default function Edit({ people, setPeople, ID }: Props) {


    const targetPerson: People | undefined = people.find(person => person.id === ID);
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [name, setName] = useState<string>(targetPerson ? targetPerson.name : "")
    const [age, setAge] = useState<string>(targetPerson ? targetPerson.age : "")
    const [url, setUrl] = useState<string>(targetPerson && targetPerson.url ? targetPerson.url : "")
    const [nationality, setNationality] = useState<string>(targetPerson ? targetPerson.nationality : "")
    const [errors, setErrors] = useState<boolean[]>([false, false, false])

    useEffect(() => {
        if (targetPerson) {
            setName(targetPerson.name);
            setAge(targetPerson.age);
            setUrl(targetPerson.url || "");
            setNationality(targetPerson.nationality);
        }
    }, [targetPerson]);
    const submitHandler = (e: FormEvent<HTMLFormElement>):void => {
        e.preventDefault()
        if (!name) {
            setErrors([true, false, false])
            return alert("Name is required.")
        }
        if (!age) {
            setErrors([false, true, false])
            return alert("Age is required.")
        }
        if (!nationality) {
            setErrors([false, false, true])
            return alert("Nationality is required.")
        }
        const filteredPeople: People[] = []
        people.forEach((person) => {
            if (person.id === ID) {
                filteredPeople.push(
                    {
                        name,
                        nationality,
                        age,
                        id: ID,
                        url
                    }
                )
            } else {
                filteredPeople.push(person)
            }
        })
        setPeople(filteredPeople)
        setIsOpen(!isOpen)
        setName("")
        setAge("")
        setUrl("")
        setNationality("")

    }
    const ClickHandler = ():void => {
        setIsOpen(!isOpen)
    }

    return (
        <>
            <Button variant="contained" color="success" className="mx-3" onClick={ClickHandler}>edit <EditDocumentIcon className="mx-1"></EditDocumentIcon> </Button>

            <Modal
                open={isOpen}
                onClose={() => setIsOpen(!isOpen)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className=' w-2/3 h-4/5 overflow-scroll flex-col item-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border'>
                    <form action="" className='flex flex-col items-center' onSubmit={(e) => submitHandler(e)} >
                        <TextField error={errors[0]} label="Name" value={name} onChange={(e) => setName(e.target.value)} className='w-1/2 my-7 mx-10' />
                        <TextField error={errors[1]} label="Age" value={age} onChange={(e) => setAge(e.target.value)} className='w-1/2 my-7 mx-10' />
                        <TextField error={errors[2]} label="Nationality" value={nationality} onChange={(e) => setNationality(e.target.value)} className='w-1/2 my-7 mx-10' />
                        <TextField label="Profile URL" value={url} onChange={(e) => setUrl(e.target.value)} className='w-1/2 my-7 mx-10' />
                        <div className="flex justify-center w-full">
                            <Button
                                className="w-1/5 border-0 bg-sky-400 text-white rounded-md px-5 py-3 my-3 hover:shadow-lg hover:bg-[rgba(56,189,248,.9)]"
                                type="submit"
                            >
                                edit
                            </Button>
                        </div>
                    </form>
                    <Box className="w-full flex justify-center my-7">
                        <Card className="w-1/4 bg-blue-200 rounded-lg overflow-visible relative ">
                            <CardHeader
                                avatar={
                                    <Avatar aria-label="" >
                                        {
                                            url ?
                                                <img src={url} className=" object-cover w-full h-full" alt="" />
                                                :
                                                name && <Typography className="bg-black text-white w-full h-full flex items-center justify-center">{name ? name[0].toUpperCase() : ""}</Typography>
                                        }
                                    </Avatar>
                                }
                                title={
                                    <Typography variant="h5" component="div">
                                        {name}
                                    </Typography>
                                }
                                subheader={
                                    <Typography variant="body2" color="text.secondary">
                                        {nationality}
                                    </Typography>
                                }

                            />
                            <CardContent sx={{ height: '100%' }} >
                                {
                                    age &&
                                    <Typography variant="body2" className="bg-cyan-300 rounded-2xl inline-block px-3 py-1 absolute -top-3 -left-3  z-50">
                                        {age} years
                                    </Typography>
                                }

                                <Box>
                                    <Button variant="contained" color="success" className="mx-3">edit</Button>
                                    <Button variant="contained" color="error" className="">delete</Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Box>
                </Box>
            </Modal>
        </>
    )
}
