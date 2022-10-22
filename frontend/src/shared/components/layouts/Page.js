const Page = (props) => {
    return (
        <div
            className= {`w-screen h-screen flex flex-col ${props.className}`}
        >{props.children}
        </div>
    );
};

export default Page;