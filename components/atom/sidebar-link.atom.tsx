import React from "react";

export const SidebarLink = ({name}: { name: string }) => {
    return (
        <div
            className='bg-blue-100 text-black hover:bg-purple-200 cursor-pointer my-4 p-3 rounded-xl'>
            {name}
        </div>
    );
}
