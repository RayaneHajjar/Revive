const AuthWrapper = (props) => {
    return (
        <div className='w-80vw tablet:w-50vw laptop:w-30vw flex flex-col items-center'>
            {props.children}
        </div>
    );
};

export default AuthWrapper;
