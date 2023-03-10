import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import useBackend from '../../containers/hooks/useBackend';

const members = ["S.Coups","Jeonghan","Joshua",
"Jun","Hoshi","Wonwoo","Woozi",
"THE8","Mingyu","DK",
"Seungkwan","Vernon","Dino"]


export default function SortDialog({item,handleSubmit,setOpenCard,BillId,category}) {

    const {AddSequenceList} = useBackend()

    
    const handleSequence=()=>{
        var S=[]
        for(var k=0;k<13;k++){
            S.push(document.getElementById(k).value)
        }
        const Data={
            BillId: BillId,
            category: category,
            Time: JSON.stringify(Date.now()),
            Sequence: S
        }
        AddSequenceList(Data)

    }

    const memberspage=()=>{
        return(
            members.map((member,i)=>{
                const label="順位"+(i+1)
                return(
                    <Autocomplete  sx={{gridColumnStart:i%3,gridColumnEnd:i%3+1,marginTop:"8px",marginBottom:"7px"}}
                    options={members}
                    clearOnEscape
                    id={i}
                    renderInput={(params) => <TextField {...params} variant="standard" label={label}/>}></Autocomplete>
                )
            })
        )
    }
    
    const choosePage=()=>{
        return(
            <>
            <Box sx={{display:"grid",gap:1.5}}>
                    <Box>
                    <Box sx={{display:"flex",flexDirection:"column"}}>
                        {memberspage()}
                    </Box>
                    </Box>
                </Box>
            </>
        )
    }

    var check=false; 

    return(
        <Box sx={{height:"300px"}}>
            {item.map((value,index)=>{check|=value.product_type})}
            <Box sx={{display:"grid",margin:"5%",gap:1.5}}>{choosePage()}</Box>
            <Button sx={{minWidth:"100%"}} variant="contained" color="success" onClick={()=>{
                handleSubmit();
                setOpenCard(false);
                handleSequence();
                }}>提交</Button>
        </Box>
    );
  
}