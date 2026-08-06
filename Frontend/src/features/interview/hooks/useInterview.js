import { getAllInterviewReports, generateInterviewReport, getInterviewReportById } from "../services/interview.api";
import { useContext, useEffect } from "react";
import { InterviewContext } from "../interview.context";
import { useParams } from "react-router";

export const useInterview = () => {
    const context = useContext(InterviewContext);
    const { interviewId } = useParams();

    if (!context) {
        throw new Error("useInterview must be used within an InterviewProvider");
    }

    const { loading, setLoading, report, setReport, reports, setReports } = context;

    const generateReport = async ({ jobDescription, selfDescription, resumeFile }) => {
        setLoading(true);
        let response = null;
        try {
            response = await generateInterviewReport({ jobDescription, selfDescription, resumeFile });
            if (response?.interviewReport) {
                setReport(response.interviewReport);
            }
        } catch (error) {
            console.error("Error generating report:", error);
        } finally {
            setLoading(false);
        }

        return response?.interviewReport || response;
    };

    const getReportById = async (id) => {
        setLoading(true);
        let response = null;
        try {
            response = await getInterviewReportById(id);
            if (response?.interviewReport) {
                setReport(response.interviewReport);
            }
        } catch (error) {
            console.error("Error fetching report by ID:", error);
        } finally {
            setLoading(false);
        }
        return response?.interviewReport || response;
    };

    const getReports = async () => {
        setLoading(true);
        let response = null;
        try {
            response = await getAllInterviewReports();
            if (response?.interviewReports) {
                setReports(response.interviewReports);
            }
        } catch (error) {
            console.error("Error fetching all reports:", error);
        } finally {
            setLoading(false);
        }

        return response?.interviewReports || response;
    };

    useEffect(() => {
        if (interviewId) {
            getReportById(interviewId);
        }
    }, [interviewId]);

    return { loading, report, reports, generateReport, getReportById, getReports };
};