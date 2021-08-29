import React, { Component, Fragment } from 'react';

import { v1 as uuidv1 } from 'uuid';
import Evidences from './Evidences';
import { ChevronDownIcon } from 'franklin-sites';

class PopulationObservation extends Component {
	constructor(props) {
		super(props);

		this.state = {
			expandedRow: null,
			expandedColocatedRow: null
		};
	}

	toggleexpandedRow(rowId) {
		const { expandedRow } = this.state;
		this.setState({
			expandedRow: rowId !== expandedRow ? rowId : null
		});
	}

	toggleColocated(rowId) {
		const { expandedColocatedRow } = this.state;
		this.setState({
			expandedColocatedRow: rowId !== expandedColocatedRow ? rowId : null
		});
	}
	getReference(xref) {
		if (
			xref.id !== null &&
			xref.id !== undefined &&
			(xref.id.startsWith('COS') || xref.id.startsWith('RCV') || xref.id.startsWith('rs'))
		) {
			return (
				<li key={uuidv1()}>
					<a href={xref.url} target="_blank" rel="noreferrer">
						{xref.id}
					</a>
				</li>
			);
		} else {
			return null;
		}
	}

	getReferenceForEachSource(sourceName, ids, populationFreq, significance) {
		// let freq = '';
		// if (populationFreq != null && populationFreq !== undefined) freq = <li>{populationFreq}</li>;
		return (
			<li key={uuidv1()}>
				<b>{sourceName} :</b>
				<ul className="flatList">
					{ids}
					{populationFreq}
					{significance}
				</ul>
			</li>
		);
	}

	getReferences(xrefs, populationFrequencies, clinicalSignificances, key) {
		let popFreqMap = new Map();
		if (populationFrequencies !== undefined && populationFrequencies.length > 0) {
			populationFrequencies.forEach((freq) => {
				let val = (
					<li>
						<b>{freq.frequencies[0].label}</b>-{freq.frequencies[0].value}
					</li>
				);
				popFreqMap.set(freq.sourceName, val);
			});
		}
		let significanceMap = new Map();
		if (clinicalSignificances !== undefined && clinicalSignificances.length > 0) {
			clinicalSignificances.forEach((significance) => {
				let type = (
					<li>
						<b>{significance.type}</b>
					</li>
				);
				significance.sources.forEach((source) => {
					significanceMap.set(source, type);
				});
			});
		}
		let xrefList = [];
		if (xrefs !== undefined && xrefs.length > 0) {
			let xrefMap = new Map();
			xrefs.forEach((xref) => {
				let source = [];
				if (xrefMap.get(xref.name) !== undefined) {
					source = xrefMap.get(xref.name);
				}
				let xrefId = this.getReference(xref);
				if (xrefId !== null) {
					source.push(xrefId);
					xrefMap.set(xref.name, source);
				}
			});
			for (let [ key, value ] of xrefMap) {
				let populationFreq = popFreqMap.get(key);
				let significance = significanceMap.get(key);
				xrefList.push(this.getReferenceForEachSource(key, value, populationFreq, significance));
			}
		}
		return <ul>{xrefList}</ul>;
		// }
	}
	getAssociation(association) {
		let name = association.name;
		if (association.description !== undefined && association.description !== null)
			name = name + '-' + association.description;
		return (
			<Fragment>
				<ul>
					<li key={uuidv1()}>{name}</li>
					<li key={uuidv1()}>
						<Evidences evidences={association.evidences} />
					</li>
				</ul>
				<hr />
			</Fragment>
		);
	}

	getAssociations(associations) {
		let diseaseAssociations = [];
		associations.forEach((association) => {
			diseaseAssociations.push(this.getAssociation(association));
		});
		if (diseaseAssociations.length > 0) {
			return diseaseAssociations;
		}
		// }
	}
	getAssociationsTag(associations, prevKey) {
		if (associations !== undefined && associations.length > 0) {
			let key = 'variant-association';
			if (prevKey !== undefined) if (prevKey) key = key + prevKey;
			return (
				<Fragment>
					<li key={uuidv1()}>
						<b>Associated Diseases:</b>
						{this.getAssociations(associations, key)}
					</li>
				</Fragment>
			);
		}
	}

	getPopFrequency(frequency) {
		let name = frequency.sourceName;
		let frequencies = frequency.frequencies.map((freq) => {
			return (
				<li key={uuidv1()}>
					{freq.label}-{freq.value}
				</li>
			);
		});
		return (
			<Fragment>
				<ul>
					<li key={uuidv1()}>{name}</li>
					<ul>
						<li key={uuidv1()}>{frequencies}</li>
					</ul>
				</ul>
				<hr />
			</Fragment>
		);
	}

	getPopulationFrequencies(populationFrequencies, key) {
		let expandedRow = this.state.expandedRow;
		if (key === expandedRow) {
			let frequencies = [];
			populationFrequencies.forEach((popFrequency) => {
				frequencies.push(this.getPopFrequency(popFrequency));
			});
			if (frequencies.length > 0) {
				return (
					<li key={uuidv1()}>
						<b>Population Freuencies:</b> {frequencies}
					</li>
				);
			}
		}
	}

	getPopulationFrequenciesTag(populationFrequencies, prevKey) {
		if (populationFrequencies !== undefined && populationFrequencies.length > 0) {
			let key = 'variant-frequency';
			if (prevKey !== undefined) if (prevKey) key = key + prevKey;
			return (
				<li key={uuidv1()}>
					<button onClick={(e) => this.toggleexpandedRow(key)}>
						<b>Population Freuencies:</b>{' '}
					</button>{' '}
					{this.getPopulationFrequencies(populationFrequencies, key)}
				</li>
			);
		}
	}

	getReferenceTag(xrefs, populationFrequencies, clinicalSignificances, prevKey) {
		let key = 'variant-reference';
		if (prevKey !== null) if (prevKey) key = key + prevKey;
		if (xrefs !== undefined && xrefs.length > 0) {
			return (
				<li key={uuidv1()}>
					<b>Identifiers</b>

					{this.getReferences(xrefs, populationFrequencies, clinicalSignificances, key)}
				</li>
			);
		}
	}
	getVariant(variants) {
		if (variants.length > 0) {
			let variant = variants[0];
			let change = variant.wildType + '>' + variant.alternativeSequence;

			return (
				<ul>
					<li key={uuidv1()}>
						<b>Genomic Location:</b> {variant.genomicLocation}
					</li>
					<li key={uuidv1()}>
						<b>Change:</b> {change}
					</li>
					{this.getReferenceTag(
						variant.xrefs,
						variant.populationFrequencies,
						variant.clinicalSignificances,
						null
					)}

					{/* {this.getAssociationsTag(variant.association)} */}

					{/* {this.getPopulationFrequenciesTag(variant.populationFrequencies)} */}

					{/* <li>{variant.predictions}</li> */}
				</ul>
			);
		}
		return (
			<label>
				<b>The variant has not been reported before</b>
			</label>
		);
	}
	getColocatedVariantDetails(variant, key) {
		let expandedColocatedRow = this.state.expandedColocatedRow;
		if (key === expandedColocatedRow) {
			// let change = variant.genomicLocation;
			return (
				<ul>
					{this.getReferenceTag(
						variant.xrefs,
						variant.populationFrequencies,
						variant.clinicalSignificances,
						key
					)}

					{this.getAssociationsTag(variant.association, key)}

					{this.getPopulationFrequencies(variant.populationFrequencies, key)}
				</ul>
			);
		}
	}
	getColocatedVariant(variant, key) {
		let expandedRow = this.state.expandedRow;
		let colocatedKey = 'colocated-' + variant.genomicLocation;
		if (key === expandedRow) {
			return (
				<ul>
					<li key={uuidv1()}>
						{/* <a onClick={(e) => this.toggleColocated(colocatedKey)}>{variant.genomicLocation}</a> */}
						<button
							type="button"
							className="collapsible"
							onClick={(e) => this.toggleColocated(colocatedKey)}
						>
							<b>{variant.genomicLocation}</b>
							<ChevronDownIcon className="chevronicon" />
						</button>
					</li>

					{this.getColocatedVariantDetails(variant, colocatedKey)}
				</ul>
			);
		}
	}

	getColocatedVariants(variants) {
		if (variants.length > 0) {
			var colocatedVariantsMap = new Map();
			var variantDetails = [];
			variants.forEach((variant) => {
				let change = variant.wildType + '>' + variant.alternativeSequence;
				var colocatedVariants = colocatedVariantsMap.get(change);
				if (colocatedVariants === null || colocatedVariants === undefined) colocatedVariants = [];
				colocatedVariants.push(<li key={uuidv1()}>{this.getColocatedVariant(variant, change)}</li>);
				colocatedVariantsMap.set(change, colocatedVariants);
			});
			for (let [ key, value ] of colocatedVariantsMap) {
				variantDetails.push(
					<li key={uuidv1()}>
						{/* <a onClick={(e) => this.toggleexpandedRow(key)}>
							{key}({value.length})
						</a> */}
						<button type="button" className="collapsible" onClick={(e) => this.toggleexpandedRow(key)}>
							<b>
								{key}({value.length})
							</b>
							<ChevronDownIcon className="chevronicon" />
						</button>
						<ul>{value}</ul>
					</li>
				);
			}
			return (
				<Fragment>
					The following variants alter the same amino acid (but alter a different nucleotide in the codon)
					<br />
					<ul>{variantDetails}</ul>
				</Fragment>
			);
		}
		return (
			<label>
				<b>No Colocated Variants to report</b>
			</label>
		);
	}

	render() {
		const { data, altAA } = this.props;

		if (data.proteinColocatedVariant !== undefined && data.proteinColocatedVariant.length > 0) {
			let variant = [];
			let colocatedVariant = [];
			data.proteinColocatedVariant.forEach((variation) => {
				if (variation.alternativeSequence === altAA) {
					variant.push(variation);
				} else {
					colocatedVariant.push(variation);
				}
			});
			let associatedDiseaseFlag = false;
			if (variant.length > 0 && variant[0].association !== undefined) associatedDiseaseFlag = true;

			return (
				<tr
					ref={(node) => {
						this.node = node;
					}}
				>
					<td colSpan="19" className="expanded-row">
						<div className="significances-groups">
							<div className="column">
								<h5>Population Observation</h5>
								<table>
									<tbody>
										<tr>
											<th>Submitted Variant Details</th>
											<th>Co-located Variants</th>
										</tr>
										<tr>
											<td>{this.getVariant(variant, 'VARIANT')}</td>
											<td>{this.getColocatedVariants(colocatedVariant, 'COLOCATED VARIANT')}</td>
										</tr>
									</tbody>
								</table>
								{associatedDiseaseFlag ? (
									<table>
										<tbody>
											<tr>
												<th>Associated Diseases</th>
											</tr>

											<tr>
												<td>{this.getAssociations(variant[0].association, 'VARIANT')}</td>
											</tr>
										</tbody>
									</table>
								) : null}
							</div>
						</div>
					</td>
				</tr>
			);
		} else {
			return (
				<tr
					ref={(node) => {
						this.node = node;
					}}
				>
					<td colSpan="19" className="expanded-row">
						{' '}
						<div className="significances-groups">
							<div className="column">
								<b>No Population Observation to report</b>
							</div>
						</div>
					</td>
				</tr>
			);
		}
	}
}

export default PopulationObservation;
