import * as React from "react";

import { userStyles } from "../../styles/userStyles";

export default function Analytics(){
    const styleClasses: any = userStyles();
    return(
        <div className={styleClasses.root}>Analytics</div>
    )
}
