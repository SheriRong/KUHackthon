import { User, Profile, Job, JobApplication, UserRole, JobType, ApplicationStatus } from '@prisma/client';

export interface UserWithProfile extends User {
  profile?: Profile;
}

export interface JobWithEmployer extends Job {
  employer: {
    name: string | null;
  };
}

export interface ApplicationWithJob extends JobApplication {
  job: JobWithEmployer;
}

export interface JobMatch {
  job: JobWithEmployer;
  matchScore: number;
  matchExplanation: string;
  keyMatches: string[];
  gapAreas: string[];
}

export type {
  User,
  Profile,
  Job,
  JobApplication,
  UserRole,
  JobType,
  ApplicationStatus,
};
