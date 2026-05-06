import { useState, useEffect } from 'react';
import { collection, doc, getDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Profile, Experience, Education, Project, Skill, OperationType } from '../types';
import { handleFirestoreError } from '../lib/error-handler';

export function useCVData() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [educations, setEducations] = useState<Education[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 5000);

    // Single document for profile
    const profileRef = doc(db, 'profile', 'data');
    const unsubProfile = onSnapshot(profileRef, (snap) => {
      clearTimeout(timeout);
      setLoading(false);
      if (snap.exists()) {
        setProfile(snap.data() as Profile);
      }
    }, (err) => {
      clearTimeout(timeout);
      setLoading(false);
      handleFirestoreError(err, OperationType.GET, 'profile/data');
    });

    // Collections (these can be empty, so we don't strictly wait for them to decide "loading" if profile is the key)
    const unsubExp = onSnapshot(query(collection(db, 'experience'), orderBy('order', 'asc')), (snap) => {
      setExperiences(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Experience[]);
    }, (err) => handleFirestoreError(err, OperationType.GET, 'experience'));

    const unsubEdu = onSnapshot(query(collection(db, 'education'), orderBy('order', 'asc')), (snap) => {
      setEducations(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Education[]);
    }, (err) => handleFirestoreError(err, OperationType.GET, 'education'));

    const unsubProj = onSnapshot(query(collection(db, 'projects'), orderBy('order', 'asc')), (snap) => {
      setProjects(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Project[]);
    }, (err) => handleFirestoreError(err, OperationType.GET, 'projects'));

    const unsubSkills = onSnapshot(query(collection(db, 'skills'), orderBy('order', 'asc')), (snap) => {
      setSkills(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Skill[]);
    }, (err) => handleFirestoreError(err, OperationType.GET, 'skills'));

    return () => {
      unsubProfile();
      unsubExp();
      unsubEdu();
      unsubProj();
      unsubSkills();
      clearTimeout(timeout);
    };
  }, []);

  return { profile, experiences, educations, projects, skills, loading };
}
