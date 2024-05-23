import { useState } from "react";
import { Tabs, Tab, Card, CardBody, Switch } from "@nextui-org/react";
import MarketingTab from "./MarketingTab";
import BlogsTab from "./BlogsTab";
import AllActivitiesTab from "./AllActivitiesTab";


export default function ContentTabs() {
    const [isVertical, setIsVertical] = useState(false);
    const [allActivities, setAllActivities] = useState(true);
    const [allMarketing, setAllMarketing] = useState(true);
    const [allBlogs, setAllBlogs] = useState(true);
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
                                <AllActivitiesTab />
                            </CardBody>
                        </Card>
                    </Tab>
                    <Tab key="email" title="Eat Now, Pay Never">
                        <Card>
                            {allMarketing ? (
                                <CardBody>
                                    <MarketingTab />
                                </CardBody>
                            ) : (
                                <CardBody>
                                    You have no activity
                                </CardBody>
                            )}
                        </Card>
                    </Tab>
                    <Tab key="blogs" title="Bloggers">
                        <Card>
                            {allBlogs ? (
                                <CardBody>
                                    <BlogsTab />
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