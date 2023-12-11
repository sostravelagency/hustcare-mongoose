import React,{memo} from 'react'

const Button = ({text, textColor, bgColor, IcAfter,IcBefore, onClick, fullWidth}) => {
  return (
    <button
        type='button'
        className={`p-2 ${textColor} ${fullWidth && 'w-full'} outline-none rounded-md hover:underline flex items-center justify-center gap-1`}
        onClick={onClick}
        style={{backgroundColor: "#da4b27"}}
    >
        <span>{IcBefore && <IcBefore />}</span>
        <span>{text}</span>
        <span>{IcAfter && <IcAfter />}</span>
    </button>
  )
}

export default memo(Button)