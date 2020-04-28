import * as React from "react";

import { userStyles } from "../../styles/userStyles";

export default function StaffSetting() {
    const styleClasses: any = userStyles();
    return (
        <div className={styleClasses.root}>Staff Settings</div>
    )
}