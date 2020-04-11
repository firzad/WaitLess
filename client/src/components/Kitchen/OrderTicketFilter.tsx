import * as React from "react";
import { AppBar, Tabs, Tab } from "@material-ui/core";
import { orderTicketFilterStyles } from "src/styles/orderTicketFilter";

export function OrderTicketFilter(props: any) {
    const { categoryList, callbackFn } = props;
    const [value, setValue] = React.useState(categoryList[0].id);

    const styleClasses = orderTicketFilterStyles();

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
                    <Tab key={index} label={item.name} value={item.id} {...a11yProps(item.id)}/>
                ))}
                {/* <Tab label="Item One" {...a11yProps(0)} />
                <Tab label="Item Two" {...a11yProps(1)} />
                <Tab label="Item Three" {...a11yProps(2)} />
                <Tab label="Item Four" {...a11yProps(3)} />
                <Tab label="Item Five" {...a11yProps(4)} />
                <Tab label="Item Six" {...a11yProps(5)} />
                <Tab label="Item Seven" {...a11yProps(6)} /> */}
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
