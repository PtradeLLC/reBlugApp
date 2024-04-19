import { useState } from "react";
import { Tabs, Tab, Card, CardBody, Switch } from "@nextui-org/react";
import AllActiveComponent from "./ActivityCover";

export default function ContentTabs() {
    const [isVertical, setIsVertical] = useState(false);
    const [allActivities, setAllActivities] = useState(false);
    const [allEmail, setAllEmail] = useState(false);
    const [allBlogs, setAllBlogs] = useState(false);
    const [noActivity, setNoActivity] = useState(null);


    return (
        <div className="flex flex-col px-2">
            <Switch className="mb-4 hidden" isSelected={isVertical} onValueChange={() => setIsVertical(!isVertical)}>
                Vertical
            </Switch>
            <div className="flex w-full flex-col overflow-auto">
                <Tabs aria-label="Options" isVertical={isVertical}>
                    <Tab key="all" title="All Activities">
                        <Card>
                            <CardBody>
                                <AllActiveComponent />
                            </CardBody>
                        </Card>
                    </Tab>
                    <Tab key="email" title="Marketing Activities">
                        <Card>
                            {allEmail ? (
                                <CardBody>
                                    "All"
                                </CardBody>
                            ) : (
                                <CardBody>
                                    You have no activity
                                </CardBody>
                            )}
                        </Card>
                    </Tab>
                    <Tab key="blogs" title="Blog Activities">
                        <Card>
                            {allBlogs ? (
                                <CardBody>
                                    "All"
                                </CardBody>
                            ) : (
                                <CardBody>
                                    You have no activity
                                </CardBody>
                            )}
                        </Card>
                    </Tab>
                </Tabs>
            </div>
        </div>
    );
}