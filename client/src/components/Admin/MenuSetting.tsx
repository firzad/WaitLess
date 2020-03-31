import * as React from "react";

import { userStyles } from "../../styles/userStyles";

export default function MenuSetting(){
    const styleClasses: any = userStyles();
    return(
        <div className={styleClasses.root}>Menu Settings</div>
    )
}
