import { useState } from "react";
import { Tabs, Tab, Card, CardBody, Switch } from "@nextui-org/react";

export default function ContentTabs() {
    const [isVertical, setIsVertical] = useState(true);
    const [allActivities, setAllActivities] = useState(false);
    const [allEmail, setAllEmail] = useState(false);
    const [allBlogs, setAllBlogs] = useState(false);
    const [noActivity, setNoActivity] = useState(null);


    return (
        <div className="flex flex-col px-4">
            <Switch className="mb-4" isSelected={isVertical} onValueChange={setIsVertical}>
                Vertical
            </Switch>
            <div className="flex w-full flex-col">
                <Tabs aria-label="Options" isVertical={isVertical}>
                    <Tab key="all" title="All Activities">
                        <Card>
                            {allActivities ? (
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
                    <Tab key="email" title="Email Activities">
                        {allEmail ? (
                            <CardBody>
                                "All"
                            </CardBody>
                        ) : (
                            <CardBody>
                                You have no activity
                            </CardBody>
                        )}
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