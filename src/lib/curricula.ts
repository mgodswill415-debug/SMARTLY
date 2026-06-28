// Smartly — Curriculum & Subject Database
// Each exam board maps to its core subjects and key topics
// Users pick a curriculum, see relevant subjects, then type ANY topic for AI

export interface ExamBoard {
  id: string;
  name: string;
  region: string;
  flag: string;
  shortName: string;
  subjects: Subject[];
}

export interface Subject {
  name: string;
  icon: string;
  popularTopics: string[];
}

// ─── WEST AFRICA ────────────────────────────────────────────────

const waecJss3Subjects: Subject[] = [
  { name: 'Mathematics', icon: '📐', popularTopics: ['Basic Operations', 'Fractions & Decimals', 'Algebraic Expressions', 'Geometry & Shapes', 'Statistics & Probability', 'Number Bases'] },
  { name: 'English Language', icon: '📝', popularTopics: ['Essay Writing', 'Comprehension', 'Grammar', 'Vocabulary', 'Summary Writing', 'Oral English'] },
  { name: 'Basic Science', icon: '🔬', popularTopics: ['Living Things', 'Matter', 'Energy', 'Force & Motion', 'Simple Machines', 'Environmental Health'] },
  { name: 'Basic Technology', icon: '⚙️', popularTopics: ['Technical Drawing', 'Materials & Tools', 'Building Construction', 'Electrical Circuits', 'Woodwork', 'Metalwork'] },
  { name: 'Social Studies', icon: '🌍', popularTopics: ['Socialization', 'Culture & Values', 'Nigerian Government', 'Family & Population', 'Resources & Development', 'Global Issues'] },
  { name: 'Civic Education', icon: '🏛️', popularTopics: ['Citizenship', 'Human Rights', 'Democracy', 'Nigerian Constitution', 'Rule of Law', 'National Values'] },
  { name: 'Christian Religious Knowledge', icon: '✝️', popularTopics: ['Creation', 'The Ten Commandments', 'Teachings of Jesus', 'Parables', 'The Early Church', 'Moral Lessons'] },
  { name: 'Islamic Religious Knowledge', icon: '☪️', popularTopics: ['Tawhid', 'Salah', 'The Five Pillars', 'Life of Prophet Muhammad', 'Hadith', 'Moral Teachings'] },
  { name: 'Business Studies', icon: '💼', popularTopics: ['Office Practice', 'Book-keeping', 'Commerce', 'Trade', 'Banking', 'Insurance'] },
  { name: 'Agricultural Science', icon: '🌾', popularTopics: ['Soil Science', 'Crop Production', 'Animal Husbandry', 'Agricultural Tools', 'Farm Management', 'Processing & Storage'] },
  { name: 'Physical & Health Education', icon: '🏃', popularTopics: ['Sports & Games', 'First Aid', 'Health & Hygiene', 'Fitness', 'Body Systems', 'Safety Education'] },
  { name: 'Creative Arts', icon: '🎨', popularTopics: ['Drawing', 'Painting', 'Sculpture', 'Textile Design', 'Art History', 'Visual Analysis'] },
  { name: 'French', icon: '🇫🇷', popularTopics: ['Basic Grammar', 'Vocabulary', 'Comprehension', 'Oral French', 'Written Expression', 'French Culture'] },
  { name: 'Computer Studies', icon: '💻', popularTopics: ['Introduction to Computing', 'Computer Hardware', 'Software', 'Internet & Email', 'Microsoft Office', 'Coding Basics'] },
  { name: 'Music', icon: '🎵', popularTopics: ['Music Theory', 'Nigerian Music', 'Musical Instruments', 'Sight Reading', 'Rhythm & Melody', 'Music Appreciation'] },
];

const waecSs3Subjects: Subject[] = [
  { name: 'Mathematics', icon: '📐', popularTopics: ['Algebra', 'Geometry & Trigonometry', 'Calculus', 'Statistics & Probability', 'Number & Numeration', 'Sets & Logic'] },
  { name: 'English Language', icon: '📝', popularTopics: ['Essay Writing', 'Comprehension', 'Summary', 'Lexis & Structure', 'Oral English', 'Letter Writing'] },
  { name: 'Physics', icon: '⚡', popularTopics: ['Mechanics', 'Waves & Sound', 'Light & Optics', 'Electricity', 'Magnetism', 'Nuclear Physics'] },
  { name: 'Chemistry', icon: '🧪', popularTopics: ['Atomic Structure', 'Chemical Bonding', 'Stoichiometry', 'Acids, Bases & Salts', 'Organic Chemistry', 'Electrochemistry'] },
  { name: 'Biology', icon: '🧬', popularTopics: ['Cell Biology', 'Genetics', 'Ecology', 'Photosynthesis', 'Human Physiology', 'Evolution'] },
  { name: 'Government', icon: '🏛️', popularTopics: ['Constitution', 'Democracy', 'Arms of Government', 'Political Parties', 'Electoral System', 'Nigerian Government'] },
  { name: 'Economics', icon: '📊', popularTopics: ['Demand & Supply', 'Inflation', 'GDP', 'Market Structures', 'International Trade', 'Economic Development'] },
  { name: 'Literature in English', icon: '📖', popularTopics: ['African Poetry', 'Non-African Poetry', 'African Drama', 'Non-African Drama', 'Prose', 'Literary Devices'] },
  { name: 'Geography', icon: '🗺️', popularTopics: ['Population', 'Climate', 'Map Reading', 'Environmental Resources', 'Settlement', 'Regional Geography'] },
  { name: 'History', icon: '📜', popularTopics: ['Nigerian History', 'Colonialism', 'Nationalism', 'Civil War', 'Slave Trade', 'Pre-Colonial Nigeria'] },
  { name: 'Civic Education', icon: '⚖️', popularTopics: ['Democracy', 'Human Rights', 'Rule of Law', 'Constitution', 'Citizenship', 'National Values'] },
  { name: 'Agricultural Science', icon: '🌾', popularTopics: ['Crop Production', 'Animal Production', 'Agricultural Economics', 'Farm Management', 'Soil Science', 'Agricultural Processing'] },
  { name: 'Accounting', icon: '🧾', popularTopics: ['Double Entry', 'Trial Balance', 'Balance Sheet', 'Depreciation', 'Partnership Accounts', 'Company Accounts'] },
  { name: 'Commerce', icon: '🏦', popularTopics: ['Trade', 'Banking', 'Insurance', 'Transportation', 'Advertising', 'Business Organization'] },
  { name: 'Further Mathematics', icon: '🔢', popularTopics: ['Polynomials', 'Matrices', 'Permutation & Combination', 'Differentiation', 'Integration', 'Binary Operations'] },
  { name: 'Computer Studies', icon: '💻', popularTopics: ['Data Processing', 'Networking', 'Programming', 'Database', 'System Security', 'ICT Applications'] },
  { name: 'CRK', icon: '✝️', popularTopics: ['The Gospels', 'Acts of Apostles', 'Epistles', 'Old Testament Prophets', 'Moral Teachings', 'Christian Ethics'] },
  { name: 'IRK', icon: '☪️', popularTopics: ['Quran', 'Hadith', 'Tawhid', 'Fiqh', 'Sirah', 'Islamic Ethics'] },
  { name: 'Food & Nutrition', icon: '🍳', popularTopics: ['Food Nutrients', 'Meal Planning', 'Food Preservation', 'Kitchen Safety', 'Balanced Diet', 'Food Hygiene'] },
  { name: 'Technical Drawing', icon: '📐', popularTopics: ['Orthographic Projection', 'Isometric Drawing', 'Building Drawing', 'Dimensioning', 'Sectioning', 'Perspective Drawing'] },
];

const jambSubjects: Subject[] = [
  { name: 'Use of English', icon: '📝', popularTopics: ['Comprehension', 'Lexis & Structure', 'Oral English', 'Register', 'Summary', 'Oral Vowels & Consonants'] },
  { name: 'Mathematics', icon: '📐', popularTopics: ['Algebra', 'Calculus', 'Trigonometry', 'Statistics', 'Geometry', 'Number Theory'] },
  { name: 'Physics', icon: '⚡', popularTopics: ['Mechanics', 'Oscillations', 'Waves', 'Electromagnetism', 'Optics', 'Modern Physics'] },
  { name: 'Chemistry', icon: '🧪', popularTopics: ['Kinetics', 'Equilibrium', 'Electrochemistry', 'Organic Chemistry', 'Thermochemistry', 'Gas Laws'] },
  { name: 'Biology', icon: '🧬', popularTopics: ['Cell Biology', 'Genetics & Heredity', 'Ecology', 'Physiology', 'Evolution', 'Taxonomy'] },
  { name: 'Economics', icon: '📊', popularTopics: ['Microeconomics', 'Macroeconomics', 'Monetary Policy', 'Fiscal Policy', 'Trade Theory', 'Development Economics'] },
  { name: 'Government', icon: '🏛️', popularTopics: ['Political Concepts', 'Nigerian Government', 'International Relations', 'Comparative Government', 'Political Ideologies', 'Constitutions'] },
  { name: 'Literature in English', icon: '📖', popularTopics: ['Drama', 'Poetry', 'Prose', 'African Literature', 'Figures of Speech', 'Literary Criticism'] },
  { name: 'Geography', icon: '🗺️', popularTopics: ['Physical Geography', 'Human Geography', 'Regional Geography', 'Map Reading', 'Climatology', 'Geomorphology'] },
  { name: 'Accounting', icon: '🧾', popularTopics: ['Financial Accounting', 'Cost Accounting', 'Company Accounts', 'Partnership', 'Public Sector Accounting', 'Accounting Theory'] },
  { name: 'Commerce', icon: '🏦', popularTopics: ['Business Environment', 'Marketing', 'Finance', 'Management', 'International Trade', 'Business Law'] },
  { name: 'CRK', icon: '✝️', popularTopics: ['Bible Knowledge', 'Moral Teachings', 'The Life of Christ', 'Apostolic Teachings', 'Christian Doctrine', 'Old Testament'] },
  { name: 'IRK', icon: '☪️', popularTopics: ['Quranic Studies', 'Islamic Theology', 'Jurisprudence', 'Prophetic Traditions', 'Islamic History', 'Arabic Language'] },
  { name: 'History', icon: '📜', popularTopics: ['Nigerian History', 'African History', 'European History', 'World Wars', 'Colonialism', 'Nationalism'] },
  { name: 'Agricultural Science', icon: '🌾', popularTopics: ['Crop Science', 'Animal Science', 'Agricultural Economics', 'Extension Services', 'Forestry', 'Fisheries'] },
  { name: 'Further Mathematics', icon: '🔢', popularTopics: ['Pure Mathematics', 'Mechanics', 'Statistics', 'Vectors', 'Complex Numbers', 'Differential Equations'] },
];

const necoSubjects: Subject[] = [
  ...waecSs3Subjects, // NECO largely mirrors WAEC SS3
  { name: 'General Mathematics', icon: '📐', popularTopics: ['Number & Numeration', 'Algebraic Processes', 'Geometry', 'Statistics', 'Trigonometry', 'Mensuration'] },
  { name: 'Basic Electricity', icon: '🔌', popularTopics: ['Ohms Law', 'Circuits', 'Magnetism', 'Transformers', 'Generators', 'Electrical Safety'] },
  { name: 'Auto Mechanics', icon: '🔧', popularTopics: ['Engine Systems', 'Transmission', 'Braking Systems', 'Electrical Systems', 'Fuel Systems', 'Maintenance'] },
  { name: 'Dyeing & Bleaching', icon: '🎨', popularTopics: ['Dye Types', 'Fabric Preparation', 'Chemical Processes', 'Color Theory', 'Design Patterns', 'Textile Care'] },
];

// ─── UK & INTERNATIONAL ─────────────────────────────────────────

const gcseSubjects: Subject[] = [
  { name: 'Mathematics', icon: '📐', popularTopics: ['Number', 'Algebra', 'Ratio & Proportion', 'Geometry & Measures', 'Probability', 'Statistics'] },
  { name: 'English Language', icon: '📝', popularTopics: ['Creative Writing', 'Reading Comprehension', 'Spelling & Grammar', 'Analysis of Texts', 'Comparison of Texts', 'Persuasive Writing'] },
  { name: 'English Literature', icon: '📖', popularTopics: ['Shakespeare', 'Modern Drama', 'Poetry Anthology', '19th Century Novel', 'Unseen Poetry', 'Comparative Analysis'] },
  { name: 'Biology', icon: '🧬', popularTopics: ['Cell Biology', 'Organisation', 'Infection & Response', 'Bioenergetics', 'Homeostasis', 'Ecology'] },
  { name: 'Chemistry', icon: '🧪', popularTopics: ['Atomic Structure', 'Chemical Changes', 'Quantitative Chemistry', 'Energy Changes', 'Organic Chemistry', 'Chemical Analysis'] },
  { name: 'Physics', icon: '⚡', popularTopics: ['Forces', 'Energy', 'Waves', 'Electricity', 'Magnetism', 'Particle Model'] },
  { name: 'Combined Science', icon: '🔬', popularTopics: ['Biology Basics', 'Chemistry Basics', 'Physics Basics', 'Scientific Method', 'Practical Skills', 'Working Scientifically'] },
  { name: 'History', icon: '📜', popularTopics: ['Medicine Through Time', 'WW1 & WW2', 'Elizabethan England', 'Cold War', 'Germany 1890-1945', 'Crime & Punishment'] },
  { name: 'Geography', icon: '🗺️', popularTopics: ['Ecosystems', 'Urban Issues', 'Natural Hazards', 'Climate Change', 'Resource Management', 'Fieldwork Skills'] },
  { name: 'Religious Studies', icon: '🙏', popularTopics: ['Christianity Beliefs', 'Islam Beliefs', 'Ethics', 'Philosophy of Religion', 'Themes', 'Scripture Analysis'] },
  { name: 'Computer Science', icon: '💻', popularTopics: ['Algorithms', 'Programming', 'Data Representation', 'Computer Systems', 'Networks', 'Cyber Security'] },
  { name: 'Business Studies', icon: '💼', popularTopics: ['Business Activity', 'Marketing', 'Operations', 'Finance', 'Human Resources', 'Business Growth'] },
  { name: 'French', icon: '🇫🇷', popularTopics: ['Listening', 'Speaking', 'Reading', 'Writing', 'Grammar', 'French Culture'] },
  { name: 'Spanish', icon: '🇪🇸', popularTopics: ['Listening', 'Speaking', 'Reading', 'Writing', 'Grammar', 'Spanish Culture'] },
  { name: 'Art & Design', icon: '🎨', popularTopics: ['Fine Art', 'Graphic Communication', 'Textile Design', '3D Design', 'Photography', 'Critical Analysis'] },
  { name: 'Music', icon: '🎵', popularTopics: ['Performing', 'Composing', 'Appraising', 'Music Theory', 'Ensemble Skills', 'Musical Contexts'] },
  { name: 'PE', icon: '🏃', popularTopics: ['Anatomy & Physiology', 'Sports Psychology', 'Socio-Cultural Issues', 'Training Methods', 'Movement Analysis', 'Practical Performance'] },
  { name: 'Design & Technology', icon: '🔧', popularTopics: ['Materials', 'Design Processes', 'Manufacturing', 'Electronics', 'CAD/CAM', 'Sustainability'] },
  { name: 'Citizenship Studies', icon: '🏛️', popularTopics: ['Democracy', 'Rights & Responsibilities', 'UK Government', 'Law & Justice', 'Global Issues', 'Active Citizenship'] },
  { name: 'Sociology', icon: '👥', popularTopics: ['Families', 'Education', 'Crime & Deviance', 'Social Stratification', 'Research Methods', 'Beliefs in Society'] },
];

const igcseSubjects: Subject[] = [
  ...gcseSubjects, // IGCSE largely overlaps GCSE
  { name: 'First Language English', icon: '📝', popularTopics: ['Reading', 'Directed Writing', 'Composition', 'Summary', 'Note-Making', 'Language Analysis'] },
  { name: 'English as Second Language', icon: '📝', popularTopics: ['Reading & Writing', 'Listening', 'Speaking', 'Vocabulary', 'Grammar', 'Functional Language'] },
  { name: 'International Mathematics', icon: '📐', popularTopics: ['Number', 'Algebra', 'Geometry', 'Trigonometry', 'Statistics', 'Probability'] },
  { name: 'Additional Mathematics', icon: '🔢', popularTopics: ['Functions', 'Quadratics', 'Calculus', 'Vectors', 'Matrices', 'Circular Measure'] },
  { name: 'Economics', icon: '📊', popularTopics: ['The Basic Economic Problem', 'Resource Allocation', 'Market Failure', 'Macro Policy', 'International Trade', 'Development'] },
  { name: 'Business Studies', icon: '💼', popularTopics: ['Enterprise', 'Marketing', 'Operations', 'Finance', 'External Environment', 'Regulation'] },
  { name: 'Environmental Management', icon: '🌍', popularTopics: ['Ecosystems', 'Pollution', 'Resource Management', 'Sustainability', 'Climate', 'Conservation'] },
  { name: 'Global Perspectives', icon: '🌐', popularTopics: ['Global Issues', 'Research Skills', 'Critical Thinking', 'Collaboration', 'Communication', 'Reflection'] },
];

const aLevelSubjects: Subject[] = [
  { name: 'Mathematics (AQA)', icon: '📐', popularTopics: ['Pure Mathematics', 'Mechanics', 'Statistics', 'Proof', 'Algebra & Functions', 'Calculus'] },
  { name: 'Mathematics (Edexcel)', icon: '📐', popularTopics: ['Pure Maths', 'Statistics & Mechanics', 'Algebra', 'Trigonometry', 'Differentiation', 'Integration'] },
  { name: 'Mathematics (Cambridge)', icon: '📐', popularTopics: ['Pure Mathematics 1-3', 'Mechanics', 'Probability & Statistics', 'Vectors', 'Complex Numbers', 'Differential Equations'] },
  { name: 'Biology (AQA)', icon: '🧬', popularTopics: ['Biological Molecules', 'Cell Structure', 'Genetics', 'Ecosystems', 'Homeostasis', 'Gene Expression'] },
  { name: 'Biology (Edexcel)', icon: '🧬', popularTopics: ['Biochemistry', 'Cell Biology', 'Genetics', 'Evolution', 'Physiology', 'Ecology'] },
  { name: 'Biology (Cambridge)', icon: '🧬', popularTopics: ['Cell Structure', 'Biochemistry', 'Genetics', 'Ecology', 'Evolution', 'Human Physiology'] },
  { name: 'Chemistry (AQA)', icon: '🧪', popularTopics: ['Physical Chemistry', 'Inorganic Chemistry', 'Organic Chemistry', 'Analytical Techniques', 'Kinetics', 'Equilibria'] },
  { name: 'Chemistry (Edexcel)', icon: '🧪', popularTopics: ['Core Chemistry', 'Inorganic Chemistry', 'Organic Chemistry', 'Physical Chemistry', 'Practical Skills', 'Modern Analytical'] },
  { name: 'Physics (AQA)', icon: '⚡', popularTopics: ['Particles & Radiation', 'Waves', 'Mechanics', 'Electricity', 'Further Mechanics', 'Nuclear Physics'] },
  { name: 'Physics (Edexcel)', icon: '⚡', popularTopics: ['Mechanics', 'Electric Circuits', 'Materials', 'Waves', 'Quantum Physics', 'Astrophysics'] },
  { name: 'English Literature', icon: '📖', popularTopics: ['Drama', 'Prose', 'Poetry', 'Shakespeare', 'Critical Analysis', 'Comparative Study'] },
  { name: 'History', icon: '📜', popularTopics: ['British History', 'European History', 'World History', 'Interpretations', 'Source Analysis', 'Thematic Study'] },
  { name: 'Economics', icon: '📊', popularTopics: ['Microeconomics', 'Macroeconomics', 'Markets', 'Market Failure', 'Economic Policy', 'Global Economy'] },
  { name: 'Geography', icon: '🗺️', popularTopics: ['Physical Geography', 'Human Geography', 'Geographical Skills', 'Fieldwork', 'Contemporary Issues', 'Sustainability'] },
  { name: 'Computer Science', icon: '💻', popularTopics: ['Programming', 'Data Structures', 'Algorithms', 'Databases', 'Networking', 'Theory of Computation'] },
  { name: 'Psychology', icon: '🧠', popularTopics: ['Social Psychology', 'Cognitive Psychology', 'Biological Psychology', 'Learning', 'Memory', 'Research Methods'] },
  { name: 'Sociology', icon: '👥', popularTopics: ['Education', 'Families', 'Crime & Deviance', 'Beliefs', 'Theory & Methods', 'Global Development'] },
  { name: 'Politics', icon: '🏛️', popularTopics: ['UK Politics', 'US Politics', 'Political Ideas', 'Global Politics', 'Comparative Politics', 'Ideologies'] },
  { name: 'Further Mathematics', icon: '🔢', popularTopics: ['Complex Numbers', 'Matrices', 'Further Calculus', 'Hyperbolic Functions', 'Differential Equations', 'Vectors'] },
  { name: 'Business', icon: '💼', popularTopics: ['Marketing', 'Operations', 'Finance', 'HR', 'Strategy', 'External Environment'] },
];

// ─── UNITED STATES & CANADA ─────────────────────────────────────

const satSubjects: Subject[] = [
  { name: 'Reading & Writing', icon: '📝', popularTopics: ['Reading Comprehension', 'Grammar', 'Sentence Structure', 'Vocabulary in Context', 'Evidence-Based Reading', 'Standard English Conventions'] },
  { name: 'Mathematics', icon: '📐', popularTopics: ['Algebra', 'Advanced Algebra', 'Problem-Solving', 'Data Analysis', 'Geometry', 'Trigonometry'] },
  { name: 'Essay (Optional)', icon: '✍️', popularTopics: ['Argument Analysis', 'Evidence Evaluation', 'Persuasive Writing', 'Critical Reading', 'Rhetorical Analysis', 'Structured Writing'] },
  { name: 'SAT Math Level 2', icon: '🔢', popularTopics: ['Functions', 'Trigonometry', 'Complex Numbers', 'Sequences & Series', 'Matrices', 'Vectors'] },
  { name: 'SAT Physics', icon: '⚡', popularTopics: ['Mechanics', 'Electricity & Magnetism', 'Waves & Optics', 'Heat & Thermodynamics', 'Modern Physics', 'Atomic Structure'] },
  { name: 'SAT Chemistry', icon: '🧪', popularTopics: ['Atomic Structure', 'Chemical Bonding', 'Stoichiometry', 'States of Matter', 'Acids & Bases', 'Reaction Rates'] },
  { name: 'SAT Biology E/M', icon: '🧬', popularTopics: ['Cell Biology', 'Genetics', 'Evolution', 'Ecology', 'Plant Biology', 'Human Physiology'] },
  { name: 'SAT World History', icon: '📜', popularTopics: ['Ancient Civilizations', 'Medieval Period', 'Renaissance', 'Industrial Revolution', 'World Wars', 'Modern History'] },
  { name: 'SAT US History', icon: '🇺🇸', popularTopics: ['Colonial America', 'Revolution', 'Constitution', 'Civil War', 'Reconstruction', '20th Century America'] },
  { name: 'SAT Literature', icon: '📖', popularTopics: ['Poetry Analysis', 'Prose Fiction', 'Drama', 'Literary Devices', 'Authorial Technique', 'Critical Analysis'] },
];

const apSubjects: Subject[] = [
  { name: 'AP Calculus AB', icon: '📐', popularTopics: ['Limits & Continuity', 'Differentiation', 'Applications of Derivatives', 'Integration', 'Differential Equations', 'Fundamental Theorem'] },
  { name: 'AP Calculus BC', icon: '🔢', popularTopics: ['Parametric Equations', 'Polar Coordinates', 'Infinite Series', 'Advanced Integration', 'Vector-Valued Functions', 'Taylor Series'] },
  { name: 'AP Biology', icon: '🧬', popularTopics: ['Chemistry of Life', 'Cell Structure', 'Cellular Energetics', 'Genetics', 'Gene Expression', 'Natural Selection'] },
  { name: 'AP Chemistry', icon: '🧪', popularTopics: ['Atomic Structure', 'Molecular Structure', 'Stoichiometry', 'Chemical Reactions', 'Thermochemistry', 'Equilibrium'] },
  { name: 'AP Physics 1', icon: '⚡', popularTopics: ['Kinematics', 'Dynamics', 'Circular Motion', 'Energy', 'Momentum', 'Simple Harmonic Motion'] },
  { name: 'AP Physics 2', icon: '⚡', popularTopics: ['Fluid Mechanics', 'Thermodynamics', 'Electric Force', 'Magnetic Force', 'Optics', 'Quantum Physics'] },
  { name: 'AP Physics C: Mechanics', icon: '⚡', popularTopics: ['Kinematics', 'Newtons Laws', 'Work & Energy', 'Impulse & Momentum', 'Rotation', 'Oscillations'] },
  { name: 'AP Physics C: E&M', icon: '⚡', popularTopics: ['Electrostatics', 'Conductors', 'Capacitors', 'Circuits', 'Magnetic Fields', 'Electromagnetism'] },
  { name: 'AP English Language', icon: '📝', popularTopics: ['Rhetorical Analysis', 'Argumentation', 'Synthesis', 'Reading Comprehension', 'Writing Strategy', 'Stylistic Analysis'] },
  { name: 'AP English Literature', icon: '📖', popularTopics: ['Poetry Analysis', 'Prose Analysis', 'Drama Analysis', 'Literary Devices', 'Theme Analysis', 'Open-Ended Essay'] },
  { name: 'AP US History', icon: '🇺🇸', popularTopics: ['Period 1-2: 1491-1754', 'Period 3: 1754-1800', 'Period 4: 1800-1848', 'Period 5: 1844-1877', 'Period 6-9: 1865-Present', 'DBQ Skills'] },
  { name: 'AP World History', icon: '🌍', popularTopics: ['Ancient Civilizations', 'Post-Classical Era', 'Early Modern', 'Long 19th Century', '20th Century', 'Historical Thinking Skills'] },
  { name: 'AP Macroeconomics', icon: '📊', popularTopics: ['GDP & Measurement', 'Aggregate Demand', 'Aggregate Supply', 'Monetary Policy', 'Fiscal Policy', 'International Trade'] },
  { name: 'AP Microeconomics', icon: '📈', popularTopics: ['Supply & Demand', 'Consumer Theory', 'Producer Theory', 'Market Structures', 'Factor Markets', 'Market Failure'] },
  { name: 'AP Computer Science A', icon: '💻', popularTopics: ['Object-Oriented Programming', 'Arrays & ArrayLists', 'Recursion', 'Sorting & Searching', 'Inheritance', 'Algorithm Analysis'] },
  { name: 'AP Computer Science Principles', icon: '🖥️', popularTopics: ['Computational Thinking', 'Algorithms', 'Programming', 'Internet', 'Data Analysis', 'Global Impact'] },
  { name: 'AP Statistics', icon: '📊', popularTopics: ['Exploring Data', 'Sampling & Experimentation', 'Probability', 'Statistical Inference', 'Regression', 'Hypothesis Testing'] },
  { name: 'AP Psychology', icon: '🧠', popularTopics: ['Scientific Foundations', 'Biological Bases', 'Sensation & Perception', 'Learning', 'Cognition', 'Social Psychology'] },
  { name: 'AP Government & Politics', icon: '🏛️', popularTopics: ['Constitutional Foundations', 'Congress', 'Presidency', 'Judiciary', 'Civil Rights', 'Political Participation'] },
  { name: 'AP Environmental Science', icon: '🌍', popularTopics: ['Ecosystems', 'Populations', 'Land & Water Use', 'Energy Resources', 'Pollution', 'Global Change'] },
];

const usHighSchoolSubjects: Subject[] = [
  { name: 'Algebra 1', icon: '📐', popularTopics: ['Linear Equations', 'Inequalities', 'Functions', 'Systems of Equations', 'Polynomials', 'Quadratic Functions'] },
  { name: 'Algebra 2', icon: '📐', popularTopics: ['Quadratic Functions', 'Polynomials', 'Rational Expressions', 'Exponentials & Logarithms', 'Sequences', 'Trigonometry'] },
  { name: 'Geometry', icon: '📐', popularTopics: ['Proofs', 'Triangles', 'Circles', 'Transformations', 'Trigonometry', 'Coordinate Geometry'] },
  { name: 'Pre-Calculus', icon: '🔢', popularTopics: ['Functions', 'Polynomials', 'Exponentials', 'Trigonometry', 'Vectors', 'Limits'] },
  { name: 'Biology', icon: '🧬', popularTopics: ['Cell Biology', 'Genetics', 'Ecology', 'Evolution', 'Human Body Systems', 'Biochemistry'] },
  { name: 'Chemistry', icon: '🧪', popularTopics: ['Matter', 'Atomic Structure', 'Chemical Reactions', 'Stoichiometry', 'States of Matter', 'Acids & Bases'] },
  { name: 'Physics', icon: '⚡', popularTopics: ['Motion', 'Forces', 'Energy', 'Waves', 'Electricity', 'Magnetism'] },
  { name: 'US History', icon: '🇺🇸', popularTopics: ['Colonial Era', 'Revolution', 'Constitution', 'Civil War', 'World Wars', 'Civil Rights'] },
  { name: 'World History', icon: '🌍', popularTopics: ['Ancient Civilizations', 'Middle Ages', 'Renaissance', 'Revolutions', 'World Wars', 'Modern Era'] },
  { name: 'English 9-12', icon: '📝', popularTopics: ['Reading Comprehension', 'Essay Writing', 'Grammar', 'Literature Analysis', 'Research Papers', 'Vocabulary'] },
  { name: 'Economics', icon: '📊', popularTopics: ['Supply & Demand', 'Market Structures', 'GDP', 'Inflation', 'Trade', 'Personal Finance'] },
  { name: 'Civics', icon: '🏛️', popularTopics: ['US Constitution', 'Bill of Rights', 'Three Branches', 'Citizenship', 'Voting', 'State & Local Government'] },
];

// ─── INDIA ──────────────────────────────────────────────────────

const cbseSubjects: Subject[] = [
  { name: 'Mathematics', icon: '📐', popularTopics: ['Number Systems', 'Polynomials', 'Linear Equations', 'Quadratic Equations', 'Arithmetic Progressions', 'Triangles & Circles'] },
  { name: 'Science', icon: '🔬', popularTopics: ['Chemical Reactions', 'Acids & Bases', 'Metals & Non-Metals', 'Life Processes', 'Light', 'Electricity'] },
  { name: 'Social Science', icon: '🌍', popularTopics: ['Indian History', 'World History', 'Geography of India', 'Democratic Politics', 'Economics', 'Development'] },
  { name: 'English', icon: '📝', popularTopics: ['Reading Comprehension', 'Writing Skills', 'Grammar', 'Literature', 'Letter Writing', 'Story Writing'] },
  { name: 'Hindi', icon: '🇮🇳', popularTopics: ['Pathya Pustak', 'Vyakaran', 'Nibandh', 'Patra Lekhan', 'Kavita', 'Kahani'] },
  { name: 'Sanskrit', icon: '📿', popularTopics: ['Shabda Roop', 'Dhatu Roop', 'Sandhi', 'Samas', 'Chhand', 'Anuvad'] },
  { name: 'Computer Science', icon: '💻', popularTopics: ['Python Basics', 'Data Types', 'Flow Control', 'Functions', 'Strings', 'Lists & Dictionaries'] },
  { name: 'Information Technology', icon: '🖥️', popularTopics: ['HTML', 'CSS', 'Database Concepts', 'Cyber Safety', 'Office Tools', 'Networking Basics'] },
  { name: 'Physics (Class 11-12)', icon: '⚡', popularTopics: ['Mechanics', 'Thermodynamics', 'Optics', 'Electromagnetism', 'Modern Physics', 'Waves'] },
  { name: 'Chemistry (Class 11-12)', icon: '🧪', popularTopics: ['Atomic Structure', 'Chemical Bonding', 'Thermodynamics', 'Equilibrium', 'Organic Chemistry', 'Electrochemistry'] },
  { name: 'Biology (Class 11-12)', icon: '🧬', popularTopics: ['Cell Biology', 'Genetics', 'Human Physiology', 'Ecology', 'Biotechnology', 'Evolution'] },
  { name: 'Mathematics (Class 11-12)', icon: '🔢', popularTopics: ['Sets & Functions', 'Algebra', 'Calculus', 'Coordinate Geometry', 'Probability', 'Linear Programming'] },
  { name: 'Accountancy', icon: '🧾', popularTopics: ['Journal Entries', 'Ledger', 'Trial Balance', 'Financial Statements', 'Partnership', 'Company Accounts'] },
  { name: 'Business Studies', icon: '💼', popularTopics: ['Nature of Business', 'Management', 'Marketing', 'Finance', 'Entrepreneurship', 'Business Environment'] },
  { name: 'Economics', icon: '📊', popularTopics: ['Indian Economy', 'Statistics', 'Microeconomics', 'Macroeconomics', 'Development', 'Poverty'] },
  { name: 'History', icon: '📜', popularTopics: ['Indian History', 'World History', 'Nationalism', 'Colonialism', 'Independence Movement', 'Modern India'] },
  { name: 'Political Science', icon: '🏛️', popularTopics: ['Indian Constitution', 'Democracy', 'International Relations', 'Political Theory', 'Governance', 'Rights & Duties'] },
  { name: 'Geography', icon: '🗺️', popularTopics: ['Physical Geography of India', 'Indian Climate', 'Resources', 'Transport', 'Population', 'Regional Development'] },
];

// ─── ALL EXAM BOARDS ────────────────────────────────────────────

export const EXAM_BOARDS: ExamBoard[] = [
  // West Africa
  { id: 'waec-jss3', name: 'WAEC (JSS3)', region: 'West Africa', flag: '🌍', shortName: 'WAEC JSS3', subjects: waecJss3Subjects },
  { id: 'waec-ss3', name: 'WAEC (SS3)', region: 'West Africa', flag: '🌍', shortName: 'WAEC SS3', subjects: waecSs3Subjects },
  { id: 'jamb', name: 'JAMB', region: 'West Africa', flag: '🌍', shortName: 'JAMB', subjects: jambSubjects },
  { id: 'neco', name: 'NECO', region: 'West Africa', flag: '🌍', shortName: 'NECO', subjects: necoSubjects },
  { id: 'school-internal', name: 'School Internal Exams', region: 'West Africa', flag: '🌍', shortName: 'School', subjects: waecSs3Subjects },
  // UK & International
  { id: 'gcse', name: 'GCSE', region: 'UK & International', flag: '🇬🇧', shortName: 'GCSE', subjects: gcseSubjects },
  { id: 'igcse', name: 'IGCSE', region: 'UK & International', flag: '🇬🇧', shortName: 'IGCSE', subjects: igcseSubjects },
  { id: 'a-levels', name: 'A-Levels', region: 'UK & International', flag: '🇬🇧', shortName: 'A-Levels', subjects: aLevelSubjects },
  // US & Canada
  { id: 'sat', name: 'SAT', region: 'United States', flag: '🇺🇸', shortName: 'SAT', subjects: satSubjects },
  { id: 'ap', name: 'AP', region: 'United States', flag: '🇺🇸', shortName: 'AP', subjects: apSubjects },
  { id: 'us-high-school', name: 'High School Diploma', region: 'United States', flag: '🇺🇸', shortName: 'HS Diploma', subjects: usHighSchoolSubjects },
  // India
  { id: 'cbse', name: 'CBSE', region: 'India', flag: '🇮🇳', shortName: 'CBSE', subjects: cbseSubjects },
];

// Grouped for the UI dropdown
export const REGIONS = [
  { name: 'West Africa', flag: '🌍', boards: EXAM_BOARDS.filter((b) => b.region === 'West Africa') },
  { name: 'UK & International', flag: '🇬🇧', boards: EXAM_BOARDS.filter((b) => b.region === 'UK & International') },
  { name: 'United States & Canada', flag: '🇺🇸', boards: EXAM_BOARDS.filter((b) => b.region === 'United States') },
  { name: 'India', flag: '🇮🇳', boards: EXAM_BOARDS.filter((b) => b.region === 'India') },
];

export function getExamBoard(id: string): ExamBoard | undefined {
  return EXAM_BOARDS.find((b) => b.id === id);
}

export function getSubjectsForBoard(boardId: string): Subject[] {
  return getExamBoard(boardId)?.subjects ?? [];
}

// Get a flat list of all subject names across all boards (for search/autocomplete)
export function getAllSubjectNames(): string[] {
  const names = new Set<string>();
  for (const board of EXAM_BOARDS) {
    for (const subject of board.subjects) {
      names.add(subject.name);
    }
  }
  return Array.from(names).sort();
}