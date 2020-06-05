import React, { Component } from 'react';
import { TreeTable } from '../../components/treetable/TreeTable';
import { Column } from "../../components/column/Column";
import { NodeService } from '../service/NodeService';
import { TreeTableSubmenu } from '../../showcase/treetable/TreeTableSubmenu';
import { TabView, TabPanel } from '../../components/tabview/TabView';
import { CodeHighlight } from '../codehighlight/CodeHighlight';
import AppContentContext from '../../AppContentContext';
import { LiveEditor } from '../liveeditor/LiveEditor';

export class TreeTableResponsiveDemo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nodes: []
        };
        this.nodeservice = new NodeService();
        this.nameTemplate = this.nameTemplate.bind(this);
    }

    componentDidMount() {
        this.nodeservice.getTreeTableNodes().then(data => this.setState({nodes: data}));
    }

    nameTemplate(node) {
        return (
            <React.Fragment>
                <span>{node.data.name}</span>
                <span className="p-col-m">, {node.data.size}</span>
                <span className="p-col-m">, {node.data.type}</span>
            </React.Fragment>
        )
    }

    render() {
        return (
            <div>
                <TreeTableSubmenu />

                <div className="content-section introduction">
                    <div className="feature-intro">
                        <h1>TreeTable - Responsive</h1>
                        <p>TreeTable columns are displayed as stacked in responsive mode if the screen size becomes smaller than a certain breakpoint value.</p>

                        <AppContentContext.Consumer>
                            { context => <button onClick={() => context.onChangelogBtnClick("treeTable")} className="layout-changelog-button">{context.changelogText}</button> }
                        </AppContentContext.Consumer>
                    </div>
                </div>

                <div className="content-section implementation">
                    <TreeTable value={this.state.nodes} header="Responsive TreeTable">
                        <Column field="name" header="Name" body={this.nameTemplate} expander headerClassName="p-col-d"></Column>
                        <Column field="size" header="Size" className="p-col-d"></Column>
                        <Column field="type" header="Type" className="p-col-d"></Column>
                    </TreeTable>
                </div>

                <TreeTableResponsiveDemoDoc />
            </div>
        )
    }
}

class TreeTableResponsiveDemoDoc extends Component {

    constructor(props) {
        super(props);

        this.sources = {
            'class': {
                tabName: 'Class Source',
                content: `
import React, { Component } from 'react';
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';
import { NodeService } from '../service/NodeService';

export class TreeTableResponsiveDemo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nodes: []
        };
        this.nodeservice = new NodeService();
        this.nameTemplate = this.nameTemplate.bind(this);
    }

    componentDidMount() {
        this.nodeservice.getTreeTableNodes().then(data => this.setState({nodes: data}));
    }

    nameTemplate(node) {
        return (
            <React.Fragment>
                <span>{node.data.name}</span>
                <span className="p-col-m">, {node.data.size}</span>
                <span className="p-col-m">, {node.data.type}</span>
            </React.Fragment>
        )
    }

    render() {
        return (
            <div>
                <TreeTable value={this.state.nodes} header="Responsive TreeTable">
                    <Column field="name" header="Name" body={this.nameTemplate} expander headerClassName="p-col-d"></Column>
                    <Column field="size" header="Size" className="p-col-d"></Column>
                    <Column field="type" header="Type" className="p-col-d"></Column>
                </TreeTable>
            </div>
        )
    }
}
                `
            },
            'hooks': {
                tabName: 'Hooks Source',
                content: `
import React, { useState, useEffect } from 'react';
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';
import { NodeService } from '../service/NodeService';

const TreeTableResponsiveDemo = () => {
    const [nodes, setNodes] = useState([]);
    const nodeservice = new NodeService();

    useEffect(() => {
        nodeservice.getTreeTableNodes().then(data => setNodes(data));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const nameTemplate = (node) => {
        return (
            <React.Fragment>
                <span>{node.data.name}</span>
                <span className="p-col-m">, {node.data.size}</span>
                <span className="p-col-m">, {node.data.type}</span>
            </React.Fragment>
        )
    }

    return (
        <div>
            <TreeTable value={nodes} header="Responsive TreeTable">
                <Column field="name" header="Name" body={nameTemplate} expander headerClassName="p-col-d"></Column>
                <Column field="size" header="Size" className="p-col-d"></Column>
                <Column field="type" header="Type" className="p-col-d"></Column>
            </TreeTable>
        </div>
    )
}
                `
            },
            'ts': {
                tabName: 'TS Source',
                content: `
import React, { useState, useEffect } from 'react';
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';
import { NodeService } from '../service/NodeService';

const TreeTableResponsiveDemo = () => {
    const [nodes, setNodes] = useState([]);
    const nodeservice = new NodeService();

    useEffect(() => {
        nodeservice.getTreeTableNodes().then(data => setNodes(data));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const nameTemplate = (node: any) => {
        return (
            <React.Fragment>
                <span>{node.data.name}</span>
                <span className="p-col-m">, {node.data.size}</span>
                <span className="p-col-m">, {node.data.type}</span>
            </React.Fragment>
        )
    }

    return (
        <div>
            <TreeTable value={nodes} header="Responsive TreeTable">
                <Column field="name" header="Name" body={nameTemplate} expander headerClassName="p-col-d"></Column>
                <Column field="size" header="Size" className="p-col-d"></Column>
                <Column field="type" header="Type" className="p-col-d"></Column>
            </TreeTable>
        </div>
    )
}
                `
            }
        }

        this.extFiles = {
            'index.css': `
.p-col-d {
    display: table-cell;
}

.p-col-m {
    display: none;
}

@media screen and (max-width: 64em) {
    .p-col-d {
        display: none;
    }

    .p-col-m {
        display: inline-block;
    }
}
            `
        };
    }

    shouldComponentUpdate() {
        return false;
    }

    renderDemoStyle() {
        return (
            <React.Fragment>
                <p>TreeTableDemo.css</p>
<CodeHighlight className="language-javascript">
{ this.extFiles['index.css'] }
</CodeHighlight>

            </React.Fragment>
        )
    }

    render() {
        return (
            <div className="content-section documentation">
                <TabView>
                    {
                        this.sources && Object.entries(this.sources).map(([key, value], index) => {
                            return (
                                <TabPanel key={`source_${index}`} header={value.tabName} contentClassName="source-content">
                                    <LiveEditor name="TreeTableResponsiveDemo" sources={[key, value]} service="NodeService" data="treetablenodes" extFiles={this.extFiles} />
                                </TabPanel>
                            );
                        })
                    }
                </TabView>
            </div>
        )
    }
}
