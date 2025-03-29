function SignIn() {
  return (
    <div className="container flex flex-col items-center justify-center h-[calc(100vh-56px)] text-light-text dark:text-dark-text">
      <div className="flex items-center flex-col bg-light-bgLighter dark:bg-dark-bgLighter py-1.5 px-5 border border-light-soft dark:border-dark-soft rounded-xl gap-2.5">
        <h1 className="text-2xl font-normal">Sign In</h1>
        <h2 className="text-base font-extralight">to continue to youtube</h2>
        <input
          type="text"
          placeholder="username"
          className="border border-light-soft dark:border-dark-soft rounded-md p-2 bg-transparent w-72"
        />
        <input
          type="password"
          placeholder="password"
          className="border border-light-soft dark:border-dark-soft rounded-md p-2 bg-transparent w-full"
        />
        <button className="rounded-[3px] border-none py-1 px-4 font-medium cursor-pointer bg-light-soft dark:bg-dark-soft text-light-textSoft dark:text-dark-textSoft hover:bg-light-soft/60 hover:dark:bg-dark-soft/60">
          Sign in
        </button>
        <h1 className="text-light-textSoft dark:text-dark-textSoft">or</h1>
        <input
          type="text"
          placeholder="username"
          className="border border-light-soft dark:border-dark-soft rounded-md p-2 bg-transparent w-full"
        />
        <input
          type="email"
          placeholder="email"
          className="border border-light-soft dark:border-dark-soft rounded-md p-2 bg-transparent w-full"
        />
        <input
          type="password"
          placeholder="password"
          className="border border-light-soft dark:border-dark-soft rounded-md p-2 bg-transparent w-full"
        />
        <button className="rounded-[3px] border-none py-1 px-4 font-medium cursor-pointer bg-light-soft dark:bg-dark-soft text-light-textSoft dark:text-dark-textSoft hover:bg-light-soft/60 hover:dark:bg-dark-soft/60">
          Sign up
        </button>
        <div className="flex text-[10px] text-light-textSoft dark:text-dark-textSoft mt-[10px]">
          <div>
            English
            <span className="ml-6">Help</span>
            <span className="ml-6">Privacy</span>
            <span className="ml-6">Terms</span>
          </div>
        </div>

        <div></div>
      </div>
    </div>
  );
}

export default SignIn;
