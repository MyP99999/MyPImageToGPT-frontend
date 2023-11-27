import { useState } from "react";

const Tooltip = ({ children, content }) => {
    const [show, setShow] = useState(false);

    return (
        <div className="relative flex items-center">
            <div
                onMouseEnter={() => setShow(true)}
                onMouseLeave={() => setShow(false)}
            >
                {children}
            </div>
            {show && (
                <div className="absolute bottom-full mb-2 bg-slate-800 text-white text-sm rounded py-1 px-4">
                    {content}
                </div>
            )}
        </div>
    );
};

export default Tooltip