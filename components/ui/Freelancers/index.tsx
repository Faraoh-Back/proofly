import { FreelancerMarketplace } from '../../freelancer/FreelancerMarketplace';
import { FreelancerProfile } from '../../freelancer/FreelancerProfile';
import { mockFreelancersMarketplace } from '../../../mocks/freelancersMarketplace';
import { mockFreelanceProfile } from '../../../mocks/freelanceData';

interface FreelancersProps {
  userType?: 'company' | 'developer';
}

export default function Freelancers({ userType = 'company' }: FreelancersProps) {
    // Se for company, mostra marketplace
    if (userType === 'company') {
        return (
            <div className="w-full">
                <FreelancerMarketplace freelancers={mockFreelancersMarketplace} />
            </div>
        );
    }
    
    // Se for developer, mostra perfil próprio
    return (
        <div className="w-full">
            <FreelancerProfile profile={mockFreelanceProfile} isEditable={true} />
        </div>
    );
}