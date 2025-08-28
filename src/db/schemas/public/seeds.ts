import { city } from './tables/city/seed';
import { countryGpaScale } from './tables/country-gpa-scale/seed';
import { country } from './tables/country/seed';
import { course } from './tables/course/seed';
import { currency } from './tables/currency/seed';
import { degree } from './tables/degree/seed';
import { gpaScale } from './tables/gpa-scale/seed';
import { language } from './tables/language/seed';
import { majorStudySubarea } from './tables/major-study-subarea/seed';
import { major } from './tables/major/seed';
import { countryNavi } from './tables/navi/country/seed';
import { courseNavi } from './tables/navi/course/seed';
import { programCourseYearNavi } from './tables/navi/program-course-year/seed';
import { programTypeNavi } from './tables/navi/program-type/seed';
import { programNavi } from './tables/navi/program/seed';
import { scholarshipNavi } from './tables/navi/scholarship/seed';
import { studyAreaNavi } from './tables/navi/study-area/seed';
import { studySubareaStudyAreaNavi } from './tables/navi/study-subarea-study-area/seed';
import { universityDesignationNavi } from './tables/navi/university-designation/seed';
import { universityMajorStudySubareaNavi } from './tables/navi/university-major-study-subarea/seed';
import { universityMajorNavi } from './tables/navi/university-major/seed';
import { universityNavi } from './tables/navi/university/seed';
import { programAcademicRequirement } from './tables/program-academic-requirement/seed';
import { programCourse } from './tables/program-course/seed';
import { programPrice } from './tables/program-price/seed';
import { programScholarship } from './tables/program-scholarship/seed';
import { programTypeInstance } from './tables/program-type-instance/seed';
import { programType } from './tables/program-type/seed';
import { program } from './tables/program/seed';
import { provider } from './tables/provider/seed';
import { rankingBody } from './tables/ranking-body/seed';
import { ranking } from './tables/ranking/seed';
import { region } from './tables/region/seed';
import { scholarship } from './tables/scholarship/seed';
import { studyArea } from './tables/study-area/seed';
import { studySubareaStudyArea } from './tables/study-subarea-study-area/seed';
import { studySubarea } from './tables/study-subarea/seed';
import { cityTranslation } from './tables/translation/city/seed';
import { countryTranslation } from './tables/translation/country/seed';
import { courseTranslation } from './tables/translation/course/seed';
import { degreeTranslation } from './tables/translation/degree/seed';
import { gpaScaleTranslation } from './tables/translation/gpa-scale/seed';
import { majorTranslation } from './tables/translation/major/seed';
import { programAcademicRequirementTranslation } from './tables/translation/program-academic-requirement/seed';
import { programTypeTranslation } from './tables/translation/program-type/seed';
import { programTranslation } from './tables/translation/program/seed';
import { rankingBodyTranslation } from './tables/translation/ranking-body/seed';
import { regionTranslation } from './tables/translation/region/seed';
import { scholarshipTranslation } from './tables/translation/scholarship/seed';
import { studyAreaTranslation } from './tables/translation/study-area/seed';
import { studySubareaTranslation } from './tables/translation/study-subarea/seed';
import { universityDesignationTranslation } from './tables/translation/university-designation/seed';
import { universityTypeTranslation } from './tables/translation/university-type/seed';
import { universityTranslation } from './tables/translation/university/seed';
import { universityDesignation } from './tables/university-designation/seed';
import { universityType } from './tables/university-type/seed';
import { universityUniversityDesignation } from './tables/university-university-designation/seed';
import { universityUniversityType } from './tables/university-university-type/seed';
import { university } from './tables/university/seed';

const seeds = [
  language,
  currency,
  countryTranslation,
  country,
  countryNavi,
  regionTranslation,
  region,
  cityTranslation,
  city,
  universityDesignationTranslation,
  universityDesignation,
  universityDesignationNavi,
  universityTypeTranslation,
  universityType,
  universityTranslation,
  university,
  universityNavi,
  universityUniversityDesignation,
  universityUniversityType,
  majorTranslation,
  major,
  universityMajorNavi,
  degreeTranslation,
  degree,
  courseTranslation,
  course,
  courseNavi,
  studyAreaTranslation,
  studyArea,
  studyAreaNavi,
  studySubareaTranslation,
  studySubarea,
  studySubareaStudyArea,
  studySubareaStudyAreaNavi,
  majorStudySubarea,
  universityMajorStudySubareaNavi,
  rankingBodyTranslation,
  rankingBody,
  ranking,
  programTypeTranslation,
  programType,
  programTypeNavi,
  programTypeInstance,
  provider,
  gpaScaleTranslation,
  gpaScale,
  countryGpaScale,
  programTranslation,
  program,
  programNavi,
  programPrice,
  programAcademicRequirementTranslation,
  programAcademicRequirement,
  programCourse,
  programCourseYearNavi,
  scholarshipTranslation,
  scholarship,
  scholarshipNavi,
  programScholarship,
];

export { seeds };
