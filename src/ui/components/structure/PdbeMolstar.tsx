import StructureIcon from '../../../images/structures-3d.svg';
import "./PdbeMolstar.css";
import "pdbe-molstar/build/pdbe-molstar-component-3.1.0";
import "pdbe-molstar/build/pdbe-molstar-light-3.1.0.css";

interface PdbeMolstarProps {
    selected: any
    pdbeRef: any
}

const PdbeMolstar = (props: PdbeMolstarProps) => {
    const pdbeComponent = <pdbe-molstar id="pdbeMolstarComponent" ref={props.pdbeRef} molecule-id={props.selected.id}
                                        bg-color-r="255" bg-color-g="255" bg-color-b="255" hide-controls="true"/>

    return <PageSpecificStructure component={pdbeComponent} />
}

interface PageSpecificStructureProps {
    component: JSX.Element
 }

const PageSpecificStructure = (props: PageSpecificStructureProps) => {
    return (
        <td colSpan={10} className="expanded-row">
            <div className="significances-groups">
                <div className="column">
                    <h5><img src={StructureIcon} className="click-icon" alt="structure icon" title="3D structure" /> Structures</h5>
                    Image zoomed to show variant location in green<br/>
                    Reference amino acid shown
                    {props.component}
                    Click variant to see surrounding residues<br/>
                    Click white space to zoom out to whole structure
                </div>
            </div>
        </td>
    );
}

export default PdbeMolstar;