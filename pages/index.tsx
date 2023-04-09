import {GridContent} from "@/components/templates/grid-content.template";
import React from "react";
import {useAppSelector} from "@/store/hooks";

export default function Home() {
    const lastUpdatedDate = useAppSelector((state) => state.emails.lastUpdatedDate)

    return (
        <>
            <GridContent headerName="Dashboard" lastUpdatedDate={lastUpdatedDate}>
            </GridContent>
        </>
    )
}
