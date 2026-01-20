import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, Upload, Loader, AlertCircle } from 'lucide-react';
import useStore from '../../store/useStore';

const FormViewer = () => {
  const { formId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addLead, theme } = useStore();
  
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState({});

  // Mock form config - in production, fetch from API
  const [formConfig, setFormConfig] = useState(null);

  useEffect(() => {
    // Simulate fetching form config
    const mockForm = {
      id: formId,
      name: 'Contact Us Form',
      type: 'multi-step',
      description: 'Get in touch with our team',
      theme: {
        headerColor: '#6366f1',
        headerImage: '',
        accentColor: '#6366f1',
        backgroundColor: '#ffffff',
        fontFamily: 'Inter'
      },
      steps: [
        {
          title: 'Personal Information',
          fields: [
            { id: 'name', type: 'text', label: 'Full Name', placeholder: 'John Doe', required: true, validation: { minLength: 2 } },
            { id: 'email', type: 'email', label: 'Email Address', placeholder: 'john@example.com', required: true, validation: { email: true } },
            { id: 'phone', type: 'phone', label: 'Phone Number', placeholder: '+1 (555) 000-0000', required: true, validation: { phone: true } }
          ]
        },
        {
          title: 'Company Details',
          fields: [
            { id: 'company', type: 'text', label: 'Company Name', placeholder: 'Acme Inc', required: true },
            { id: 'companySize', type: 'dropdown', label: 'Company Size', required: true, options: ['1-10', '11-50', '51-200', '201-500', '500+'] },
            { id: 'industry', type: 'dropdown', label: 'Industry', required: false, options: ['Technology', 'Healthcare', 'Finance', 'Retail', 'Other'] }
          ]
        },
        {
          title: 'Your Needs',
          fields: [
            { id: 'budget', type: 'radio', label: 'Budget Range', required: true, options: ['< $5k', '$5k - $25k', '$25k - $100k', '$100k+'] },
            { id: 'timeline', type: 'radio', label: 'Project Timeline', required: true, options: ['Immediate', '1-3 months', '3-6 months', '6+ months'] },
            { id: 'services', type: 'checkbox', label: 'Services Interested In', required: false, options: ['Web Development', 'Mobile App', 'Marketing', 'Consulting'] },
            { id: 'message', type: 'textarea', label: 'Tell us about your project', placeholder: 'Describe your needs...', required: true, validation: { minLength: 20, maxLength: 1000 } },
            { id: 'attachment', type: 'file', label: 'Upload Documents (Optional)', required: false, validation: { fileTypes: ['.pdf', '.doc', '.docx'], maxSize: 5 } }
          ]
        }
      ],
      settings: {
        submitText: 'Submit Form',
        successType: 'message', // 'message', 'custom', 'redirect'
        successMessage: 'Thank you for your submission! We will get back to you soon.',
        customMessage: '',
        redirectUrl: '',
        notificationEmail: 'admin@ledsws.com',
        captureMetadata: true,
        gdprCompliant: true,
        autoScore: true,
        pipelineStage: 'new',
        leadTag: 'website-form',
        sourceConfig: {
          sourceType: 'Website',
          domainDetection: true,
          allowUtmOverride: true
        },
        autoTagRules: [
          { condition: 'budget', value: '$100k+', tag: 'Hot' },
          { condition: 'timeline', value: 'Immediate', tag: 'Hot' },
          { condition: 'companySize', value: '500+', tag: 'Enterprise' }
        ]
      },
      hiddenFields: ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'referrer', 'pageUrl', 'device', 'country']
    };
    
    setFormConfig(mockForm);
  }, [formId]);

  // Capture UTM params and metadata
  useEffect(() => {
    if (formConfig) {
      const metadata = {
        utm_source: searchParams.get('utm_source') || '',
        utm_medium: searchParams.get('utm_medium') || '',
        utm_campaign: searchParams.get('utm_campaign') || '',
        utm_content: searchParams.get('utm_content') || '',
        utm_term: searchParams.get('utm_term') || '',
        referrer: document.referrer,
        pageUrl: window.location.href,
        device: /Mobile/.test(navigator.userAgent) ? 'mobile' : 'desktop',
        domain: window.location.hostname,
        country: 'Unknown' // Would be detected server-side
      };
      
      formConfig.hiddenFields.forEach(field => {
        setFormData(prev => ({ ...prev, [field]: metadata[field] || '' }));
      });
    }
  }, [formConfig, searchParams]);

  // Validation functions
  const validateField = (field, value) => {
    if (field.required && (!value || (Array.isArray(value) && value.length === 0))) {
      return `${field.label} is required`;
    }

    if (field.validation) {
      if (field.validation.email && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Invalid email address';
      }

      if (field.validation.phone && value) {
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (!phoneRegex.test(value) || value.length < 10) return 'Invalid phone number';
      }

      if (field.validation.minLength && value && value.length < field.validation.minLength) {
        return `Minimum ${field.validation.minLength} characters required`;
      }

      if (field.validation.maxLength && value && value.length > field.validation.maxLength) {
        return `Maximum ${field.validation.maxLength} characters allowed`;
      }

      if (field.validation.min && value && parseFloat(value) < field.validation.min) {
        return `Minimum value is ${field.validation.min}`;
      }

      if (field.validation.max && value && parseFloat(value) > field.validation.max) {
        return `Maximum value is ${field.validation.max}`;
      }
    }

    return null;
  };

  const validateStep = (stepIndex) => {
    const step = formConfig.steps[stepIndex];
    const stepErrors = {};
    let isValid = true;

    step.fields.forEach(field => {
      const error = validateField(field, formData[field.id]);
      if (error) {
        stepErrors[field.id] = error;
        isValid = false;
      }
    });

    setErrors(stepErrors);
    return isValid;
  };

  const handleInputChange = (fieldId, value) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
    // Clear error when user types
    if (errors[fieldId]) {
      setErrors(prev => ({ ...prev, [fieldId]: null }));
    }
  };

  const handleFileUpload = (fieldId, files) => {
    setUploadedFiles(prev => ({ ...prev, [fieldId]: files[0] }));
    handleInputChange(fieldId, files[0]?.name || '');
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };

  const getUserIP = async () => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch (error) {
      return 'unknown';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);

    try {
      const ipAddress = await getUserIP();

      // Detect if form is embedded
      const isEmbedded = window !== window.top;
      const currentDomain = window.location.hostname;
      
      // Resolve domain - if embedded, get parent domain from referrer
      let resolvedDomain = currentDomain;
      let submissionType = 'hosted'; // 'hosted', 'embedded', 'shared'
      
      if (isEmbedded && formConfig.settings.resolveDomain) {
        try {
          // Get parent domain from referrer
          const referrerUrl = new URL(document.referrer);
          resolvedDomain = referrerUrl.hostname;
          submissionType = 'embedded';
        } catch (e) {
          // If referrer parsing fails, fall back to current domain
          resolvedDomain = currentDomain;
        }
      } else if (window.location.pathname.includes('/form/')) {
        // Direct form link access
        submissionType = 'shared';
      }

      // Determine source with priority: UTM > Shared Link > Domain Detection > Default
      let source = formConfig.settings.sourceConfig.sourceType;
      
      if (formData.utm_source && formConfig.settings.sourceConfig.allowUtmOverride) {
        // UTM parameter has highest priority
        source = formData.utm_source;
      } else if (submissionType === 'shared') {
        // Shared form link
        source = 'Shared Form Link';
        if (document.referrer) {
          try {
            const referrerDomain = new URL(document.referrer).hostname;
            source = `Shared Form Link - Referred by ${referrerDomain}`;
          } catch (e) {
            // Keep default
          }
        }
      } else if (isEmbedded && formConfig.settings.sourceConfig.domainDetection) {
        // Embedded form with domain detection
        source = `Website - ${resolvedDomain}`;
      }

      // Auto-tag based on rules
      const autoTags = [formConfig.settings.leadTag];
      formConfig.settings.autoTagRules.forEach(rule => {
        if (formData[rule.condition] === rule.value) {
          autoTags.push(rule.tag);
        }
      });

      // Add submission type tags
      if (submissionType === 'embedded') {
        autoTags.push('Embedded Form');
      } else if (submissionType === 'shared') {
        autoTags.push('Shared Link');
      }

      // Calculate initial lead score
      let leadScore = 0;
      if (formData.budget === '$100k+') leadScore += 30;
      if (formData.timeline === 'Immediate') leadScore += 25;
      if (formData.companySize === '500+') leadScore += 20;
      if (formData.services?.length > 2) leadScore += 15;

      // Determine initial status based on qualification
      let initialStatus = 'New';
      if (leadScore >= 50) {
        initialStatus = 'Qualified';
        autoTags.push('Auto-Qualified');
      }

      // Check for duplicates if enabled
      let isDuplicate = false;
      let duplicateLeadId = null;
      if (formConfig.settings.enableDuplicateDetection) {
        // This would check against existing leads in production
        // For now, just marking the flag - CRM will show warnings
        isDuplicate = false; // Would be: checkForDuplicates(formData.email, formData.phone)
      }

      // Create lead with dynamic fields
      const leadData = {
        // Standard CRM fields
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        source: source,
        status: initialStatus,
        stage: formConfig.settings.pipelineStage,
        tags: autoTags,
        leadScore: leadScore,
        
        // Form-specific dynamic fields
        ...Object.keys(formData).reduce((acc, key) => {
          if (!formConfig.hiddenFields.includes(key) && !['name', 'email', 'phone', 'company'].includes(key)) {
            acc[key] = formData[key];
          }
          return acc;
        }, {}),

        // Enhanced Metadata with submission context
        metadata: {
          formId: formConfig.id,
          formName: formConfig.name,
          timestamp: new Date().toISOString(),
          submittedAt: new Date().toLocaleString('en-US', { 
            dateStyle: 'full', 
            timeStyle: 'long' 
          }),
          firstContactTimestamp: null, // Will be set when lead is first contacted
          ipAddress: formConfig.settings.gdprCompliant ? 'masked' : ipAddress,
          pageUrl: formData.pageUrl,
          referrer: formData.referrer,
          device: formData.device,
          domain: formData.domain,
          resolvedDomain: resolvedDomain,
          country: formData.country,
          submissionType: submissionType, // 'hosted', 'embedded', 'shared'
          isEmbedded: isEmbedded,
          isDuplicate: isDuplicate,
          duplicateLeadId: duplicateLeadId,
          utm_source: formData.utm_source,
          utm_medium: formData.utm_medium,
          utm_campaign: formData.utm_campaign,
          utm_content: formData.utm_content,
          utm_term: formData.utm_term,
          completionTime: '2m 34s' // Would be calculated from session start
        }
      };

      // Add to CRM
      addLead(leadData);

      // Handle success
      setIsSubmitting(false);
      
      if (formConfig.settings.successType === 'redirect' && formConfig.settings.redirectUrl) {
        window.location.href = formConfig.settings.redirectUrl;
      } else {
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setIsSubmitting(false);
      setErrors({ submit: 'An error occurred. Please try again.' });
    }
  };

  const renderField = (field) => {
    const errorMessage = errors[field.id];
    const fieldValue = formData[field.id] || '';

    switch (field.type) {
      case 'text':
      case 'email':
      case 'phone':
      case 'number':
        return (
          <input
            type={field.type}
            value={fieldValue}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            placeholder={field.placeholder || 'Your answer'}
            className={`w-full px-0 py-2 border-b text-gray-900 text-base bg-transparent focus:outline-none ${
              errorMessage ? 'border-red-500' : 'border-gray-300 focus:border-purple-600'
            }`}
            style={{ borderBottomColor: errorMessage ? '#ef4444' : (formData[field.id] ? formConfig.theme?.accentColor : undefined) }}
          />
        );

      case 'textarea':
        return (
          <textarea
            value={fieldValue}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            placeholder={field.placeholder || 'Your answer'}
            rows={4}
            className={`w-full px-0 py-2 border-b text-gray-900 text-base bg-transparent resize-none focus:outline-none ${
              errorMessage ? 'border-red-500' : 'border-gray-300 focus:border-purple-600'
            }`}
            style={{ borderBottomColor: errorMessage ? '#ef4444' : (formData[field.id] ? formConfig.theme?.accentColor : undefined) }}
          />
        );

      case 'dropdown':
        return (
          <select
            value={fieldValue}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            className={`w-full px-0 py-2 border-b text-gray-900 text-base bg-transparent focus:outline-none ${
              errorMessage ? 'border-red-500' : 'border-gray-300 focus:border-purple-600'
            }`}
            style={{ borderBottomColor: errorMessage ? '#ef4444' : (formData[field.id] ? formConfig.theme?.accentColor : undefined) }}
          >
            <option value="">Choose</option>
            {field.options.map((option, idx) => (
              <option key={idx} value={option}>{option}</option>
            ))}
          </select>
        );

      case 'radio':
        return (
          <div className="space-y-3 mt-4">
            {field.options.map((option, idx) => (
              <label key={idx} className="flex items-center space-x-3 cursor-pointer group">
                <div className="relative">
                  <input
                    type="radio"
                    name={field.id}
                    value={option}
                    checked={fieldValue === option}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                    className="sr-only"
                  />
                  <div 
                    className={`w-5 h-5 rounded-full border-2 transition-all ${
                      fieldValue === option 
                        ? 'border-purple-600' 
                        : 'border-gray-400 group-hover:border-gray-600'
                    }`}
                    style={{ borderColor: fieldValue === option ? formConfig.theme?.accentColor : undefined }}
                  >
                    {fieldValue === option && (
                      <div 
                        className="w-2.5 h-2.5 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                        style={{ backgroundColor: formConfig.theme?.accentColor || '#6366f1' }}
                      />
                    )}
                  </div>
                </div>
                <span className="text-gray-700 text-base">{option}</span>
              </label>
            ))}
          </div>
        );

      case 'checkbox':
        return (
          <div className="space-y-3 mt-4">
            {field.options.map((option, idx) => {
              const isChecked = Array.isArray(fieldValue) && fieldValue.includes(option);
              return (
                <label key={idx} className="flex items-center space-x-3 cursor-pointer group">
                  <div className="relative">
                    <input
                      type="checkbox"
                      value={option}
                      checked={isChecked}
                      onChange={(e) => {
                        const currentValues = Array.isArray(fieldValue) ? fieldValue : [];
                        const newValues = e.target.checked
                          ? [...currentValues, option]
                          : currentValues.filter(v => v !== option);
                        handleInputChange(field.id, newValues);
                      }}
                      className="sr-only"
                    />
                    <div 
                      className={`w-5 h-5 rounded border-2 transition-all flex items-center justify-center ${
                        isChecked 
                          ? 'border-purple-600' 
                          : 'border-gray-400 group-hover:border-gray-600'
                      }`}
                      style={{ 
                        borderColor: isChecked ? formConfig.theme?.accentColor : undefined,
                        backgroundColor: isChecked ? formConfig.theme?.accentColor : 'transparent'
                      }}
                    >
                      {isChecked && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <span className="text-gray-700 text-base">{option}</span>
                </label>
              );
            })}
          </div>
        );

      case 'file':
        return (
          <div className="mt-4">
            <label className="flex items-center justify-center px-4 py-8 border-2 border-dashed rounded-lg cursor-pointer transition-all border-gray-300 hover:bg-gray-50">
              <input
                type="file"
                onChange={(e) => handleFileUpload(field.id, e.target.files)}
                className="hidden"
                accept={field.validation?.fileTypes?.join(',')}
              />
              <div className="text-center">
                <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                {uploadedFiles[field.id] ? (
                  <p className="text-sm font-medium text-gray-900">
                    {uploadedFiles[field.id].name}
                  </p>
                ) : (
                  <>
                    <p className="text-sm font-medium text-gray-700">
                      Add file
                    </p>
                    {field.validation?.fileTypes && (
                      <p className="text-xs mt-1 text-gray-500">
                        {field.validation.fileTypes.join(', ')} 
                        {field.validation?.maxSize && ` (Max ${field.validation.maxSize}MB)`}
                      </p>
                    )}
                  </>
                )}
              </div>
            </label>
          </div>
        );

      default:
        return null;
    }
  };

  if (!formConfig) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    );
  }

  if (isSubmitted) {
    const displayMessage = formConfig.settings.successType === 'custom' && formConfig.settings.customMessage
      ? formConfig.settings.customMessage
      : formConfig.settings.successMessage;

    return (
      <div 
        className="min-h-screen flex items-center justify-center p-4"
        style={{ 
          backgroundColor: formConfig.theme?.backgroundColor || '#ffffff',
          fontFamily: formConfig.theme?.fontFamily || 'Inter'
        }}
      >
        <div className="max-w-2xl w-full bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div 
            className="h-2.5" 
            style={{ backgroundColor: formConfig.theme?.headerColor || '#6366f1' }}
          />
          <div className="p-12 text-center">
            <CheckCircle 
              className="w-16 h-16 mx-auto mb-6" 
              style={{ color: formConfig.theme?.accentColor || '#6366f1' }}
            />
            <h1 className="text-2xl font-medium text-gray-900 mb-3">
              Form submitted
            </h1>
            <p className="text-base text-gray-600">
              {displayMessage}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const currentStepData = formConfig.steps[currentStep];
  const isLastStep = currentStep === formConfig.steps.length - 1;
  const isFirstStep = currentStep === 0;

  return (
    <div 
      className="min-h-screen py-8 px-4"
      style={{ 
        backgroundColor: formConfig.theme?.backgroundColor || '#f9fafb',
        fontFamily: formConfig.theme?.fontFamily || 'Inter'
      }}
    >
      <div className="max-w-3xl mx-auto space-y-3">
        {/* Form Header Card */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
          <div 
            className="h-2.5" 
            style={{ backgroundColor: formConfig.theme?.headerColor || '#6366f1' }}
          />
          <div className="p-8">
            <h1 className="text-3xl font-normal text-gray-900 mb-2">
              {formConfig.name}
            </h1>
            {formConfig.description && (
              <p className="text-sm text-gray-600">
                {formConfig.description}
              </p>
            )}
          </div>

          {/* Progress Indicator for Multi-step */}
          {formConfig.type === 'multi-step' && (
            <div className="px-8 pb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">
                  Page {currentStep + 1} of {formConfig.steps.length}
                </span>
                <span className="text-sm font-medium text-gray-600">
                  {Math.round(((currentStep + 1) / formConfig.steps.length) * 100)}% completed
                </span>
              </div>
              <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full transition-all duration-300"
                  style={{ 
                    width: `${((currentStep + 1) / formConfig.steps.length) * 100}%`,
                    backgroundColor: formConfig.theme?.accentColor || '#6366f1'
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Section Title Card (if exists) */}
        {currentStepData.title && (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
            <div className="p-6">
              <h2 className="text-xl font-medium text-gray-900">
                {currentStepData.title}
              </h2>
            </div>
          </div>
        )}

        {/* Question Cards */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {currentStepData.fields.map((field, fieldIndex) => (
            <div key={field.id} className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="p-6">
                <label className="block text-base text-gray-900 mb-4">
                  {field.label} {field.required && <span className="text-red-500">*</span>}
                </label>
                
                {renderField(field)}
                
                {errors[field.id] && (
                  <div className="flex items-center space-x-2 mt-3 text-red-500 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors[field.id]}</span>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Navigation Buttons Card */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between">
              {!isFirstStep ? (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="px-6 py-2.5 text-gray-700 hover:bg-gray-50 rounded font-medium border border-gray-300"
                >
                  Back
                </button>
              ) : (
                <div />
              )}

              {isLastStep ? (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center space-x-2 px-6 py-2.5 text-white rounded font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  style={{ backgroundColor: formConfig.theme?.accentColor || '#6366f1' }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <span>{formConfig.settings.submitText}</span>
                  )}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-6 py-2.5 text-white rounded font-medium transition-colors"
                  style={{ backgroundColor: formConfig.theme?.accentColor || '#6366f1' }}
                >
                  Next
                </button>
              )}
            </div>
          </div>

          {/* Clear form link */}
          <div className="text-center py-2">
            <button
              type="button"
              onClick={() => {
                setFormData({});
                setErrors({});
                window.scrollTo(0, 0);
              }}
              className="text-sm hover:underline"
              style={{ color: formConfig.theme?.accentColor || '#6366f1' }}
            >
              Clear form
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="text-center pt-4 pb-2">
          <p className="text-xs text-gray-500">
            This form was created inside of LedsWS.{' '}
            <a 
              href="https://ledsws.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:underline"
              style={{ color: formConfig.theme?.accentColor || '#6366f1' }}
            >
              Report Abuse
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FormViewer;
