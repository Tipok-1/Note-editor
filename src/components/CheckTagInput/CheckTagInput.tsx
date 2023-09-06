import { useState, useEffect, useRef, memo } from 'react';
import { Box } from '@mui/material';
import Chip from '@mui/material/Chip';
import { createId } from '../../Services/GeneralService';
import "./CheckTagInput.css"

interface IContent {
    id: string,
    type: string,
    value: string
}
interface ICheckTagInput{
    getAllText?:boolean,
    getTextRef?:React.MutableRefObject<string>
    height:number,
    placeholder?:string,
    InputValue?:string,
}
const CheckTagInput = ({getAllText, height, placeholder, InputValue, getTextRef}:ICheckTagInput) => {
    const Input = useRef<HTMLDivElement>();
    const [content, setContent] = useState<IContent[]>([{ id: createId(), type: 'string', value: '' }]);
    function makeTags(text:string[]):IContent[]{
        const resultText: IContent[] = []
        if (text.length) {
            let txt = '';
            text.forEach((el) => {
                if (el.match(/^#.+?$/gi)) {
                    resultText.push({ id: createId(), type: 'string', value: txt });
                    txt = '';
                    resultText.push({ id: createId(), type: 'chip', value: el })
                } else {
                    txt += ` ${el}`;
                }
            })
            resultText.push({ id: createId(), type: 'string', value: txt })
        }
        return resultText;
    }

    function changeText(e: React.FormEvent<HTMLParagraphElement>, id: string) {
        const paragrafh = e.target as HTMLParagraphElement
        const event = e.nativeEvent as InputEvent;
        if (event.data == ' ') {
            const text = paragrafh.innerText.trim().split(' ');
            const resultText = makeTags(text);
            if (resultText.length > 1) {
                const index = content.findIndex(el => el.id == id);
                if (index >= 0) {
                    const arr = [...content.slice(0, index), ...resultText, ...content.slice(index + 1)]
                    paragrafh.focus();
                    setContent(arr)
                }

            }
        } 
    }
    function deleteChip(e: React.MouseEvent<HTMLElement, MouseEvent>,id: string) {
        const index = content.findIndex(el => el.id == id);
        const previous = e.currentTarget.parentElement?.previousElementSibling;
        const next = e.currentTarget.parentElement?.nextElementSibling
        if(previous && next) {
            if(previous.tagName == 'P' && next.tagName == 'P') {
                next.innerHTML = previous.innerHTML + next.innerHTML;
                const arr = [...content.slice(0,index-1),...content.slice(index+1)];
                setContent(arr);
            }
            
        }
    }
    useEffect(()=>{
        if(getAllText) {
            const text = getAllInputText();
            if(getTextRef)
                getTextRef.current = text.trim();
        }
    }, [getAllText])

    useEffect(()=>{
        if(InputValue) {
            const text = InputValue.trim().split(' ');
            const resultText = makeTags(text);
            setContent(resultText)
        }
    },[])

    function getAllInputText():string {
        const Div= Input.current as HTMLDivElement
        let txt = '';
        const arr = Array.from(Div.childNodes);
        for (let c of arr) {
            let el = c as Node;
            txt += ' ' + el.textContent;
        }
        txt.trim();
        return txt;
    }
    return (
        <Box
            ref={Input}
            className='BoxClass'
            sx={{
                width: '97%',
                display: 'flex',
                position: 'relative',
                borderRadius: '5px',
                userSelect: 'none',
                alignItems:'start',
                height: 'auto',
                p:'10px',
                flexWrap: 'wrap',
                wordWrap:'anywhere',
                maxHeight:`${height}px`,
                justifyContent:'start',
                overflow:'auto'
            }}
        >
        
            {
                content.map((el, i, arr) => {
                    if (el.type === "string") {
                        return (<p
                            placeholder={placeholder ? placeholder :''}
                            className={(arr.length == 1 && !el.value) ? 'Placeholder':''}
                            contentEditable="true"
                            suppressContentEditableWarning={true}
                            key={el.id}
                            style={{ flexGrow: i == arr.length - 1 ? '1' : '', minWidth: '5px', outline: '0', margin:'5px 0', fontSize:'18px'}}
                            onInput={e => changeText(e, el.id)}
                        >{el.value}</p>)
                    }
                    else if (el.type === "chip") {
                        return <Chip onDelete={e => deleteChip(e,el.id)} key={el.id} label={el.value} sx={{ m: '2px' }} />
                    }
                })
            }
        </Box>
    );
};

export default memo(CheckTagInput);