
const ToggleButton = ({ toggleHistory }) => {
    return (
        <button onClick={toggleHistory}>
            <svg width="23" height="23" viewBox="0 0 23 23">
                {/* Top line */}
                <path
                    d="M 2 4.5 L 21 4.5"
                    strokeWidth="3"
                    stroke="white"
                    strokeLinecap="round"
                />
                {/* Middle line */}
                <path
                    d="M 2 11.5 L 21 11.5"
                    strokeWidth="3"
                    stroke="white"
                    strokeLinecap="round"
                />
                {/* Bottom line */}
                <path
                    d="M 2 18.5 L 21 18.5"
                    strokeWidth="3"
                    stroke="white"
                    strokeLinecap="round"
                />
            </svg>
        </button>
    );
};

export default ToggleButton;
