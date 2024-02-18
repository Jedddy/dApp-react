import React from 'react';


const Info = ({ text }: { text: string }): React.ReactNode => {
    return <div className="w-full h-full flex justify-center items-center">
        <p>{text}</p>
    </div>
}

export default Info;