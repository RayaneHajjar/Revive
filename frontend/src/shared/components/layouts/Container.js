const Container = (props) => {
    const default_class = 'flex-1 w-full h-92vh p-8 ';
    return (
        <div
            className= {default_class + props.className}
        >{props.children}
        </div>
    );
};

export default Container;