% subject(ID, ClassID, ProfID, Weight, HoursPerWeek).
subject("sub_id_1", "class_id_1", "prof_id_1", 5, 6).
subject("sub_id_2", "class_id_1", "prof_id_2", 2, 8).
subject("sub_id_3", "class_id_2", "prof_id_1", 8, 4).
subject("sub_id_4", "class_id_2", "prof_id_2", 5, 5).

% days_per_week(Num).
days_per_week(6).

% hours_per_day(Num).
hours_per_day(5).

% unavailable_on(Type: "prof" | "class", EntityID, Day, Hour).
unavailable_on("prof", "prof_id_1", 0, 0).
unavailable_on("prof", "prof_id_1", 0, 1).
unavailable_on("prof", "prof_id_1", 0, 2).
unavailable_on("prof", "prof_id_1", 0, 3).
unavailable_on("prof", "prof_id_1", 0, 4).

unavailable_on("prof", "prof_id_2", 3, 0).
unavailable_on("prof", "prof_id_2", 3, 1).
unavailable_on("prof", "prof_id_2", 3, 2).
unavailable_on("prof", "prof_id_2", 3, 3).
unavailable_on("prof", "prof_id_2", 3, 4).

unavailable_on("class", "class_id_1", 0, 4).
unavailable_on("class", "class_id_1", 1, 4).
unavailable_on("class", "class_id_1", 2, 4).
unavailable_on("class", "class_id_1", 3, 4).
unavailable_on("class", "class_id_1", 4, 4).
unavailable_on("class", "class_id_1", 5, 4).

unavailable_on("class", "class_id_2", 0, 0).
unavailable_on("class", "class_id_2", 1, 0).
unavailable_on("class", "class_id_2", 2, 0).
unavailable_on("class", "class_id_2", 3, 0).
unavailable_on("class", "class_id_2", 4, 0).
unavailable_on("class", "class_id_2", 5, 0).

% uncomment when testing partial solution completion
    % assign_subject_on(SubjectID, Day, Hour).
    % assign_subject_on("sub_id_1", 1, 0).
    % assign_subject_on("sub_id_1", 1, 1).
    % assign_subject_on("sub_id_1", 1, 2).

    % assign_subject_on("sub_id_2", 2, 3).
    % assign_subject_on("sub_id_2", 2, 3).


% weak_constraint(ConstraintName, Priority).
% Priority: bigger is more important
% ConstraintName: 
% - "contiguous_subject_hours"
% - "least_subjects_batches"
% - "least_subjects_swaps"
% - "minimize_days_weight_difference"

weak_constraint("contiguous_subject_hours", 4).
weak_constraint("least_subjects_batches", 3).
weak_constraint("minimize_days_weight_difference", 2).
weak_constraint("least_subjects_swaps", 1).




