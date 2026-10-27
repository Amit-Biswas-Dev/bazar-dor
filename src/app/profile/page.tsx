"use client"

import { authClient } from "@/lib/auth-client";

const page = () => {

     const {data: session} = authClient.useSession()
        const user = session?.user;


    const handleUpdateProfile = async (e:React.SubmitEvent<HTMLElement>)=>{
        e.preventDefault()
        const formData = new FormData(e.target);
        const newUserData = {
          name: String(formData.get("name") ?? ""),
          image: String(formData.get("image") ?? ""),
        }

        await authClient.updateUser({
            ...newUserData
        })
    }
    return (
        <div className="mt-5">
            <div className="flex flex-col items-center gap-2">
                    <div className="avatar">
                    <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring-2 ring-offset-2">
                   <img alt="Tailwind-CSS-Avatar-component" src={user?.image as string} />
                    </div>
                    </div>
                    <h2>{user?.name}</h2>
                    <p>{user?.email}</p>

                    {/* <button onClick ={handleSignout}  className="btn btn-error btn-xs">SignOut</button> */}
                 </div>

                  <form onSubmit={handleUpdateProfile}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Sign Up</legend>

          <label className="label">Name</label>
          <input
            type="text"
            name="name"
            className="input w-full"
            placeholder="Name"
            required
          />

          <label className="label">Image URL</label>
          <input
            type="url"
            name="image"
            className="input w-full"
            placeholder="Image URL"
          />

          



          <button type="submit" className="btn btn-neutral mt-4 w-full">
            Update Profile
          </button>
        </fieldset>
      </form>
        </div>
    );
};

export default page;