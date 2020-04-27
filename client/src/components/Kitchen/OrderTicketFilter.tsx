import * as React from "react";
import { AppBar, Tabs, Tab } from "@material-ui/core";
import { orderTicketFilterStyles } from "src/styles/orderTicketFilter";
import { useEffect } from "react";

export function OrderTicketFilter(props: any) {
    const { categoryList, callbackFn } = props;
    const [value, setValue] = React.useState(props.filterValue.category_id);

    const styleClasses = orderTicketFilterStyles();

    useEffect(() => {
        setValue(props.filterValue.category_id);
    }, [props.filterValue]);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: any) => {
        setValue(newValue);
        callbackFn(newValue);
    };

    return (
        <AppBar position="static" color="default">
            <Tabs
                value={value}
                classes={{ root: styleClasses.root, scroller: styleClasses.scroller }}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
            >
                {categoryList.map((item, index) => (
                    <Tab key={index} label={item.category_name} value={item.category_id} {...a11yProps(item.category_id)}/>
                ))}

            </Tabs>
        </AppBar>
    );
}
function a11yProps(index: any) {
    return {
      id: `scrollable-auto-tab-${index}`,
      'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
  }
