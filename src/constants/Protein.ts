export const PROTEINS = {
  CATALYTIC_ACTIVITY: 'CATALYTIC ACTIVITY',
  ACTIVITY_REGULATION: 'ACTIVITY REGULATION',
  SUBUNIT: 'SUBUNIT',
  INTERACTION: 'INTERACTION',
  SUBCELLULAR_LOCATION: 'SUBCELLULAR LOCATION',
  DOMAIN: 'DOMAIN',
  PTM: 'PTM',
  SIMILARITY: 'Family',
  WEBRESOURCE: 'Additional Resource'
};

export const FEATURES = {
  INIT_MET: 'Cleaved Initiator Methionine',
  SIGNAL: 'Signal Peptide',
  TRANSIT: 'Cleaved Transit Peptide',
  PROPEP: 'Propeptide',
  CHAIN: 'Chain',
  PEPTIDE: 'Peptide',
  TOPO_DOM: 'Transmembrane Protein Topological Region',
  TRANSMEM: 'Helical Transmembrane Peptide',
  DOMAIN: 'Functional Domain',
  REPEAT: 'Repeated Sequence',
  REGION: 'Region',
  COILED: 'Coiled-coil Region',
  MOTIF: 'Functional Motif',
  COMPBIAS: 'AA Composition Bias',
  DNA_BIND: 'DNA Binding Residue',
  NP_BIND: 'Nucleotide Phosphate Binding Residue',
  ACT_SITE: 'Active Site Residue',
  METAL: 'Metal Ion Binding Site Residue',
  BINDING: 'Binding Site Residue',
  CA_BIND: 'Calcium Binding Residue',
  ZN_FING: 'Zinc Finger Residue',
  SITE: 'Functionally Important Residue',
  MOD_RES: 'PTM Modified Residue',
  LIPID: 'PTM bound Lipid',
  PTM: 'PTM',
  MUTAGEN: 'Mutagenesis',
  CATALYTIC_ACTIVITY: 'Catalytic Activity',
  ACTIVITY_REGULATION: 'ACTIVITY REGULATION',
  SUBUNIT: 'SUBUNIT',
  INTERACTION: 'INTERACTION',
  SUBCELLULAR_LOCATION: 'SUBCELLULAR LOCATION',
  SIMILARITY: 'Family',
  WEBRESOURCE: 'Additional Resource',
  HELIX: 'Helix'
};

export const AMINO_ACID_FULL_NAME: Map<string, string> = new Map(Object.entries({
  ala: "Alanine",
  arg: "Arginine",
  asn: "Asparagine",
  asp: "Aspartic acid",
  asx: "Asparagine or aspartic acid",
  cys: "Cysteine",
  glu: "Glutamic acid",
  gln: "Glutamine",
  glx: "Glutamine or glutamic acid",
  gly: "Glycine",
  his: "Histidine",
  ile: "Isoleucine",
  leu: "Leucine",
  lys: "Lysine",
  met: "Methionine",
  phe: "Phenylalanine",
  pro: "Proline",
  ser: "Serine",
  thr: "Threonine",
  trp: "Tryptophan",
  tyr: "Tyrosine",
  val: "Valine",
  "*": "Stop"
}));
