import { create } from "zustand";

export const useStore = create((set) => ({
  YearOfTheWedding: 2024,
  MonthOfTheWedding: 11,
  DayOfTheWedding: 21,
  HourOfTheWedding: 7,
  MinuteOfTheWedding: 30,
  LocationOfTheWedding: "חתם סופר 25 עמנואל",
  DescriptionOfTheWedding:
    "אנו מתרגשים להזמינכם לחגוג עמנו את יום חתונתנו! האירוע יתקיים ביום חמישי, 21 בספטמבר 2024, בשעה 17:00, בחוף השקיעה, מיאמי, פלורידה. אישורי הגעה יתקבלו בשמחה באתר שלנו. נשמח לראותכם ולחגוג יחד את הרגע המיוחד הזה!",
  NmaeOfBride: "יוסף",
  NameOfGroom: "ציפי",
  ChengeYearOfTheWedding: () => set((state: any) => ({ location: state.location })),
  ChengeMonthOfTheWedding: () => set((state: any) => ({ location: state.location })),
  ChengeDayOfTheWedding: () => set((state: any) => ({ location: state.location })),
  ChengeHourOfTheWedding: () => set((state: any) => ({ location: state.location })),
  ChengeMinuteOfTheWedding: () => set((state: any) => ({ location: state.location })),
  ChengeLocationOfTheWedding: () => set((state: any) => ({ location: state.location })),
  ChengeDescriptionOfTheWedding: () => set((state: any) => ({ location: state.location })),
  ChengeNmaeOfBride: () => set((state: any) => ({ location: state.location })),
  ChengeNameOfGroom: () => set((state: any) => ({ location: state.location })),

}));
