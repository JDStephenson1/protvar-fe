import DefaultPageLayout from "../layout/DefaultPageLayout";
import {ENSEMBL_ASML_URL, HUMSAVAR_URL} from "../../constants/ExternalUrls";
import React from "react";

function AboutPageContent() {
  return <div className="container">
    <span>
      <b>What is ProtVar</b>
      <br />
    </span>
    <div className="text">
      <p>
        ProtVar is an online service to interpret the effects of variants on protein function and
        structure. It utilises functional information from the Ensembl Variant Effect Predictor
        (VEP), the UniProt functional residue annotation (Protein function), and the PDBe structural
        residue annotation.
      </p>
    </div>
    <hr />
    <span>
      <b>Examples:</b>
    </span>
    <div className="text">
      <ul>
        <li>
          VCF
          <br />
          3 165830358 165830358 T/C . . .<br />
          21 43072000 43072000 T/C . . .<br />
        </li>
        <li>
          HGVS
          <br />
          {"NC_000014.9:g.89993420A>G"}<br />
          {"NC_000010.11:g.87933147C>G"}<br />
        </li>
        <li>
          VCF FILE
          <br />
          #CHROM POS ID REF ALT QUAL FILTER INFO<br />
          21 25891796 . C T . . . <br />
          14 73173574 . C T . . .<br />
        </li>
      </ul>
    </div>
    <hr />
    <span>
      <b>Response:</b>
    </span>

    <div className="text">
      <ul>
        <li>
          The genes and transcripts where the variants are located, with Ensembl identifiers.
        </li>
        <li>
          The proteins and protein isoforms affected by the variants, with UniProt identifiers and
          corresponding amino acid positions and changes.
        </li>
        <li>
          The consequence of your variants on the protein sequence (e.g. stop gained, missense,
          stop lost, frameshift).
        </li>

        <li>SIFT, PolyPhen and CADD scores for changes in the protein sequence.</li>

        <li>
          Known variants in the nucleotide and amino acid position that match your variants, with
          dbSNPs, ClinVar and UniProt variant identifiers.
        </li>
        <li>Population frequency from 1000 Genomes project and gnomAD.</li>

        <li>
          Functional information per amino acid residue affected by your variants (e.g. functional
          domains, and sites like active, binding sites and post-translational modifications).
        </li>
        <li>
          Known disease associations in the amino acid position that match your variants as
          described in UniProt.
        </li>

        <li>
          Known mutagenesis experiments in the amino acid position that match your variants as
          described in UniProt.
        </li>
        <li>
          Known structures and ligand binding sites in the amino acid position that match your
          variants.
        </li>
      </ul>

      <span>
      <b>Useful links:</b>
      </span>

      <div className="text">
        <ul>
          <li>
            <a href={ENSEMBL_ASML_URL} target="_blank" rel="noopener noreferrer" className="ref-link">
              Ensembl's Assembly Remapping
            </a>
          </li>
          <li>
            <a href={HUMSAVAR_URL} target="_blank" rel="noopener noreferrer" className="ref-link">
              Human variants curated from literature reports
            </a>
          </li>
        </ul>
      </div>

    </div>
  </div>
}

function AboutPage() {
  return <DefaultPageLayout content={<AboutPageContent />} />
}
export default AboutPage;