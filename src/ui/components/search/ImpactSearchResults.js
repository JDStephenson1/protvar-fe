import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import Button from '../../elements/form/Button';
import ExpandedPositionalSignificance from '../significances/ExpandedPositionalSignificance';
import ExpandedTranscriptSignificance from '../significances/ExpandedTranscriptSignificance';
import ExpandedClinicalSignificance from '../significances/ExpandedClinicalSignificance';
import ExpandedStructuralSignificance from '../significances/ExpandedStructuralSignificance';

class ImpactSearchResults extends Component {
  state = {
    expandedRow: null,
  }

  toggleSignificanceRow(rowId, significanceType) {
    const { expandedRow } = this.state;
    const rowIdAndType = `${rowId}:${significanceType}`;

    this.setState({
      expandedRow: (rowIdAndType !== expandedRow)
        ? rowIdAndType
        : null
    });
  }

  render() {
    const { expandedRow } = this.state;
    const { rows } = this.props;
    let counter = 0;

    return (
      <div className="search-results">
        <table border="0" className="unstriped" cellpadding="0" cellspacing="0">
          <tbody>
            <tr>
              <th rowSpan="2">#</th>
              <th rowSpan="2">Gene Name</th>
              <th colSpan="4">Protein</th>
              <th colSpan="4">Genomic</th>
              <th rowSpan="2">Significance</th>
            </tr>
            <tr>
              <th>Accession</th>
              <th>Length</th>
              <th>Position</th>
              <th>Variant</th>
              <th>ENSG</th>
              <th>ENST</th>
              <th>Location</th>
              <th>Allele</th>
            </tr>

            {Object.keys(rows)
              .map(key => {
                const group = rows[key];
                return (
                  <Fragment key={`${group.key}`}>
                    <tr>
                      <td colSpan="11" className="query-row">Query: {group.input}</td>
                    </tr>
                    {group.rows.map((row, i) => {
                      const { protein, gene, significances } = row;
                      const proteinPosition = (protein.start === protein.end)
                        ? protein.start
                        : `${protein.start}-${protein.end}`;
                      const geneLocation = `${gene.chromosome}:${gene.start}-${gene.end}`;
                      const rowKey = `${group.key}-${i}`;

                      return (
                        <Fragment>
                          <tr key={rowKey}>
                            <td>{++counter}</td>
                            <td>{gene.name}</td>
                            <td>{protein.accession}</td>
                            <td></td>
                            <td>{proteinPosition || '-'}</td>
                            <td>{protein.variant || '-'}</td>
                            <td>{gene.ensgId}</td>
                            <td>{gene.enstId}</td>
                            <td>{geneLocation}</td>
                            <td>{gene.allele}</td>
                            <td>
                              {('undefined' !== typeof significances.positional)
                                ? <Button onClick={() => this.toggleSignificanceRow(rowKey, 'positional')} className="button--round button--positional">P</Button>
                                : null }

                              {('undefined' !== typeof significances.clinical)
                                ? <Button onClick={() => this.toggleSignificanceRow(rowKey, 'clinical')} className="button--round button--clinical">C</Button>
                                : null }

                              {('undefined' !== typeof significances.transcript)
                                ? <Button onClick={() => this.toggleSignificanceRow(rowKey, 'transcript')} className="button--round button--transcript">T</Button>
                                : null }

                              {('undefined' !== typeof significances.structural)
                                ? <Button onClick={() => this.toggleSignificanceRow(rowKey, 'structural')} className="button--round button--structural">S</Button>
                                : null }
                            </td>
                          </tr>
                          {(`${rowKey}:positional` === expandedRow)
                            ? <ExpandedPositionalSignificance data={significances.positional} />
                            : null }

                          {(`${rowKey}:clinical` === expandedRow)
                            ? <ExpandedClinicalSignificance data={significances.clinical} />
                            : null }

                          {(`${rowKey}:transcript` === expandedRow)
                            ? <ExpandedTranscriptSignificance data={significances.transcript} />
                            : null }

                          {(`${rowKey}:structural` === expandedRow)
                            ? <ExpandedStructuralSignificance data={significances.structural} />
                            : null }
                        </Fragment>
                      )
                    })}
                  </Fragment>
                );
            })}
          </tbody>
        </table>
        { /* props.results */ }
      </div>
    );
  }
}

export default ImpactSearchResults;